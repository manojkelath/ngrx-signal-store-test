export interface PaymentInstructionsApiModel {
  title: string;
  introductoryText: string;
  instructions: { instruction: string }[];
}
