import { TipoAtividade } from "../enums/tipo-atividade";

export interface MultiplaEscolhaModel {
  id: number;
  question: string;
  type: TipoAtividade.Multipla_Escolha;
  options: string[];
  correct_answer_pt?: string;
  correct_answer_es?: string;
  explanation_pt?: string;
  explanation_es?: string;
  correct_answer: string;
  explanation: string;
}
