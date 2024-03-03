export const updateContact = (currentContact: any, placeOfBirth: string, nationality: string, birthDate: string) => ({
  ...currentContact,
  contact: {
    ...currentContact.contact,
    party: {
      ...currentContact.contact.party,
      ...(nationality ? { nationality } : {}),
      ...(birthDate ? { birthDate } : {}),
      placeOfBirth: {
        ...currentContact.contact.party.placeOfBirth,
        ...(placeOfBirth ? { locality: placeOfBirth } : {}),
      },
    },
  },
});
