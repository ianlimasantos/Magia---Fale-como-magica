import { GeneratedActivityModel } from "../generated-activity/generated-activity-model";
import { CompleteActivityModel } from "./complete-activity-model";

export interface CreateCompleteOpenAiDto {
  createGeneratedActivityDto: GeneratedActivityModel;
  createCompleteDto: CompleteActivityModel[];
}
