import { GenerativeModel, GoogleGenerativeAI } from '@google/generative-ai';
import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class GeminiService {
  private apiURL: string;

  private aiModel: GenerativeModel;
  constructor(
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {
    this.apiURL = this.configService.get('API_URL');
    const genAI = new GoogleGenerativeAI(this.configService.get('API_KEY'));

    this.aiModel = genAI.getGenerativeModel({
      model: this.configService.get('MODEL'),
    });
  }
  async generateAnswer(prompt: string) {
    const request = {
      contents: [
        {
          parts: [{ text: prompt }],
        },
      ],
    };
    const response = this.httpService.post(this.apiURL, request, {
      headers: {
        'Content-Type': 'application/json',
      },
    });

    return firstValueFrom(response);
  }

  async generateAnswerStream(prompt: string) {
    console.log(await this.aiModel.countTokens(prompt));
    const result = await this.aiModel.generateContentStream([prompt]);

    return result.stream;
  }
}
