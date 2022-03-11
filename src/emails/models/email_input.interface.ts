export default interface EmailInput {
  subject: string;
  email: string;
  template: string;
  templateValues: Template;
  priority: number;
}

interface Template {
  templateKey: string;
}