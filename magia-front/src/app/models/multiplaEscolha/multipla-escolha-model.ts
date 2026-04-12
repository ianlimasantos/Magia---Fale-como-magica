import { TipoAtividade } from "../enums/tipo-atividade";

export interface MultiplaEscolhaModel {
  id: number;
  question: string;
  type: TipoAtividade.Multipla_Escolha;
  options: string[];
  correct_answer: string;
  explanation: string;
}
