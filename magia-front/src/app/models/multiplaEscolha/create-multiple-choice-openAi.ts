import { GeneratedActivityModel } from "../generated-activity/generated-activity-model";
import { MultiplaEscolhaModel } from "./multipla-escolha-model";

export interface CreateMultiplaEscolhaOpenAiModel {
  GeneratedActivityDto: GeneratedActivityModel;
  MultipleChoiceDto: MultiplaEscolhaModel[];
}
