import { ICandidateFeedback } from '@leano/contracts';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TenantAwareCrudService } from './../core/crud';
import { CandidateFeedback } from './candidate-feedbacks.entity';

@Injectable()
export class CandidateFeedbacksService extends TenantAwareCrudService<CandidateFeedback> {
	constructor(
		@InjectRepository(CandidateFeedback)
		private readonly candidateFeedbackRepository: Repository<CandidateFeedback>
	) {
		super(candidateFeedbackRepository);
	}
	async getFeedbacksByInterviewId(
		interviewId: string
	): Promise<CandidateFeedback[]> {
		return await this.repository
			.createQueryBuilder('candidate_feedback')
			.where('candidate_feedback.interviewId = :interviewId', {
				interviewId
			})
			.getMany();
	}
	calcRating(feedbacks: ICandidateFeedback[]) {
		const rate: number[] = [];
		feedbacks.forEach((fb) => {
			rate.push(Number(fb.rating));
		});
		const fbSum = rate.reduce((sum, current) => {
			return sum + current;
		});
		return fbSum / feedbacks.length;
	}
}
