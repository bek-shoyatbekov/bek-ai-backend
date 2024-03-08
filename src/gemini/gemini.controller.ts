import { Body, Controller, Post, Res } from '@nestjs/common';
import { GeminiService } from './gemini.service';
import { PromptDto } from './dto/prompt.dto';
import { Response } from 'express';

@Controller('gemini')
export class GeminiController {
  constructor(private readonly geminiService: GeminiService) {}

  @Post('text')
  async generateText(@Body() prompt: PromptDto) {
    const response = await this.geminiService.generateAnswer(prompt.prompt);
    const { candidates } = response.data;
    const result = candidates[0]?.content?.parts[0]?.text;
    return result;
  }

  @Post('stream')
  async generateTextStream(
    @Body() promptText: PromptDto,
    @Res() res: Response,
  ) {
    res.setHeader('Content-Type', 'text/event-stream');
    res.setHeader('Cache-Control', 'no-cache');
    res.setHeader('Connection', 'keep-alive');

    const resultStream = await this.geminiService.generateAnswerStream(
      promptText.prompt,
    );

    for await (const chunk of resultStream) {
      console.log(chunk.text());
      const filteredText = chunk.text().replace(/\W/g, ' ');
      res.write(`data: ${filteredText}\n\n`);
    }

    res.write('data: [DONE]\n\n');
    res.end();
  }
  
}






























