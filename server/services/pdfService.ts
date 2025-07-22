import fs from 'fs';
import path from 'path';
import pdf from 'pdf-parse';
import puppeteer from 'puppeteer';

export class PDFService {
  async extractTextFromPDF(buffer: Buffer): Promise<string> {
    try {
      const data = await pdf(buffer);
      return data.text;
    } catch (error) {
      console.error('Error extracting text from PDF:', error);
      throw new Error('Failed to extract text from PDF. Please ensure the file is a valid PDF.');
    }
  }

  async generateStudyGuidePDF(data: {
    filename: string;
    summary: string;
    questions: any[];
    selectedTypes: string[];
  }): Promise<Buffer> {
    const html = this.generateHTML(data);
    
    try {
      const browser = await puppeteer.launch({
        headless: true,
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });
      
      const page = await browser.newPage();
      await page.setContent(html, { waitUntil: 'networkidle0' });
      
      const pdfBuffer = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '1in',
          right: '0.8in',
          bottom: '1in',
          left: '0.8in'
        }
      });
      
      await browser.close();
      return Buffer.from(pdfBuffer);
    } catch (error) {
      console.error('Error generating PDF:', error);
      throw new Error('Failed to generate PDF study guide. Please try again.');
    }
  }

  private generateHTML(data: {
    filename: string;
    summary: string;
    questions: any[];
    selectedTypes: string[];
  }): string {
    const questionTypeNames: { [key: string]: string } = {
      theoretical: 'Theoretical Questions',
      application: 'Application-Based Questions',
      numerical: 'Numerical Problems',
      mcq: 'Multiple Choice Questions',
      fillblanks: 'Fill in the Blanks',
      truefalse: 'True/False Questions'
    };

    const questionSections = data.questions.map(section => {
      const typeName = questionTypeNames[section.type] || section.type;
      const questionsHtml = section.questions.map((q: any, index: number) => {
        let questionHtml = `
          <div class="question-item">
            <h4>Q${index + 1}. ${q.question}</h4>
        `;

        if (q.options && q.options.length > 0) {
          questionHtml += `
            <div class="options">
              ${q.options.map((option: string) => `<p>${option}</p>`).join('')}
            </div>
          `;
        }

        questionHtml += `
            <div class="answer">
              <strong>Answer:</strong> ${q.answer}
            </div>
        `;

        if (q.explanation) {
          questionHtml += `
            <div class="explanation">
              <strong>Explanation:</strong> ${q.explanation}
            </div>
          `;
        }

        questionHtml += `</div>`;
        return questionHtml;
      }).join('');

      return `
        <div class="question-section">
          <h3>${typeName}</h3>
          ${questionsHtml}
        </div>
      `;
    }).join('');

    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>Study Guide - ${data.filename}</title>
        <style>
          body {
            font-family: 'Roboto', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background: white;
          }
          
          .header {
            text-align: center;
            border-bottom: 3px solid #1976D2;
            padding-bottom: 20px;
            margin-bottom: 30px;
          }
          
          .header h1 {
            color: #1976D2;
            font-size: 28px;
            margin-bottom: 10px;
          }
          
          .header p {
            color: #666;
            font-size: 16px;
            margin: 5px 0;
          }
          
          .section {
            margin-bottom: 40px;
            page-break-inside: avoid;
          }
          
          .section h2 {
            color: #1976D2;
            border-bottom: 2px solid #E3F2FD;
            padding-bottom: 10px;
            margin-bottom: 20px;
            font-size: 24px;
          }
          
          .summary {
            background-color: #F5F5F5;
            padding: 20px;
            border-left: 5px solid #1976D2;
            border-radius: 5px;
            margin-bottom: 30px;
          }
          
          .summary p {
            margin-bottom: 15px;
            text-align: justify;
          }
          
          .question-section {
            margin-bottom: 30px;
            page-break-inside: avoid;
          }
          
          .question-section h3 {
            color: #424242;
            background-color: #E3F2FD;
            padding: 12px;
            border-radius: 5px;
            margin-bottom: 20px;
            font-size: 20px;
          }
          
          .question-item {
            margin-bottom: 25px;
            padding: 15px;
            border: 1px solid #E0E0E0;
            border-radius: 8px;
            background-color: #FAFAFA;
          }
          
          .question-item h4 {
            color: #1976D2;
            margin-bottom: 12px;
            font-size: 16px;
          }
          
          .options {
            margin: 10px 0;
          }
          
          .options p {
            margin: 5px 0;
            padding-left: 15px;
          }
          
          .answer {
            background-color: #E8F5E8;
            padding: 10px;
            border-radius: 5px;
            margin-top: 10px;
          }
          
          .answer strong {
            color: #2E7D32;
          }
          
          .explanation {
            background-color: #FFF3E0;
            padding: 10px;
            border-radius: 5px;
            margin-top: 8px;
          }
          
          .explanation strong {
            color: #F57C00;
          }
          
          .footer {
            text-align: center;
            margin-top: 40px;
            padding-top: 20px;
            border-top: 1px solid #E0E0E0;
            color: #666;
            font-size: 14px;
          }
          
          @media print {
            body { print-color-adjust: exact; }
            .question-section { page-break-inside: avoid; }
            .question-item { page-break-inside: avoid; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>AI-Generated Study Guide</h1>
          <p><strong>Source Document:</strong> ${data.filename}</p>
          <p><strong>Generated on:</strong> ${new Date().toLocaleDateString()}</p>
          <p><strong>Total Questions:</strong> ${data.questions.reduce((sum, section) => sum + section.questions.length, 0)}</p>
        </div>

        <div class="section">
          <h2>📝 Summary</h2>
          <div class="summary">
            <p>${data.summary.replace(/\n/g, '</p><p>')}</p>
          </div>
        </div>

        <div class="section">
          <h2>❓ Question Bank</h2>
          ${questionSections}
        </div>

        <div class="footer">
          <p>Generated by AI Study Guide Generator</p>
          <p>Powered by Hugging Face AI Models</p>
        </div>
      </body>
      </html>
    `;
  }
}

export const pdfService = new PDFService();
