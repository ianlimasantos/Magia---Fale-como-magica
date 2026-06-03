import { TipoAtividade } from "../enums/tipo-atividade";

export interface CompleteActivityModel {
  id: number;
  question: string;
  type: TipoAtividade.Completar;
  correct_answer_es: string;
  explanation_pt: string;
  explanation_es: string;
}
