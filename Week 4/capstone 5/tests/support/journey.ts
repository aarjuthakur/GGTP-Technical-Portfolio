import { SurveyPage } from '../../pages/SurveyPage';
import { Demographics } from '../../pages/PageDemographics';
import {
  validUser,
  productUsage,
  positiveBranchData,
} from '../../fixtures/surveyData';

export async function openSurvey(survey: SurveyPage): Promise<void> {
  await survey.goto();
}

export async function reachProductUsage(
  survey: SurveyPage,
  user: Demographics = validUser,
): Promise<void> {
  await survey.goto();
  await survey.completeDemographics(user);
}

export async function reachSatisfaction(
  survey: SurveyPage,
  options: { rating: number; nps: number },
): Promise<void> {
  await reachProductUsage(survey);
  await survey.completeProductUsage({
    source: productUsage.source,
    features: [...productUsage.features],
    rating: options.rating,
    nps: options.nps,
  });
}

export async function reachFeedback(
  survey: SurveyPage,
  options: { rating: number; nps: number },
): Promise<void> {
  await reachSatisfaction(survey, options);
  await survey.completeSatisfactionPositive({
    likes: positiveBranchData.likes,
    bestFeature: positiveBranchData.bestFeature,
    purchaseDate: positiveBranchData.purchaseDate,
  });
}

export async function reachPreferences(
  survey: SurveyPage,
  options: { rating: number; nps: number; caseStudy: 'Yes' | 'No' },
): Promise<void> {
  await reachFeedback(survey, options);
  await survey.completeFeedbackPromoter(options.caseStudy);
}

export async function completeFullSurvey(
  survey: SurveyPage,
  options: { followUp: 'Yes' | 'No'; caseStudy: 'Yes' | 'No' } = {
    followUp: 'Yes',
    caseStudy: 'Yes',
  },
): Promise<void> {
  await reachPreferences(survey, { rating: 5, nps: 9, caseStudy: options.caseStudy });
  await survey.preferences.selectFollowUp(options.followUp);
  if (options.followUp === 'Yes') {
    await survey.preferences.selectContactMethod('Email');
    await survey.preferences.fillContactTime('09:30');
  }
  await survey.preferences.selectLikert('agree');
  await survey.next();
}
