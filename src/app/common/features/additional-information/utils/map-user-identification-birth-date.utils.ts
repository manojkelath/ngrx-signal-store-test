import { dateFormatter } from '@shared/utils';

export function mapUserIdentificationBirthDateUtils(form) {
  if (form?.birthDate) {
    const date = new Date(form.birthDate);
    const birthDate = `${date.getFullYear()}-${dateFormatter(date.getMonth() + 1)}-${dateFormatter(
      date.getDate()
    )}T00:00:00.000Z`;

    return {
      ...form,
      birthDate,
    };
  }

  return form;
}
