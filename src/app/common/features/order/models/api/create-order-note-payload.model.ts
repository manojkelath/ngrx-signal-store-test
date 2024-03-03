export interface CreateOrderNotePayloadModel {
  topic: {
    subject: string;
    contentType: string;
    contextCategory: string;
    contextId: string;
    editableInPortal: boolean;
  };
  content: string;
}
