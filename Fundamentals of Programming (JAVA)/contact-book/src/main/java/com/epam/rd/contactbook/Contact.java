package com.epam.rd.contactbook;

public class Contact {
    private String name;
    private String phoneNumber;
    private Email[] emails = new Email[3];
    private Social[] socialMedia = new Social[5];
    private int emailCount = 0;
    private int socialMediaCount = 0;

    public Contact(String contactName) {
        this.name = contactName;
    }

    public void rename(String newName) {
        if (newName != null && !newName.isEmpty()) {
            this.name = newName;
        }
    }

    public Email addEmail(String localPart, String domain) {
        if (emailCount < 3) {
            Email email = new Email(localPart + "@" + domain);
            emails[emailCount++] = email;
            return email;
        }
        return null;
    }

    public Email addEpamEmail(String firstname, String lastname) {
        if (emailCount < 3) {
            Email email = new Email(firstname + "_" + lastname + "@epam.com") {
                @Override
                public String getTitle() {
                    return "Epam Email";
                }
            };
            emails[emailCount++] = email;
            return email;
        }
        return null;
    }

    public ContactInfo addPhoneNumber(int code, String number) {
        if (phoneNumber == null) {
            ContactInfo phoneNumber = new ContactInfo() {
                @Override
                public String getTitle() {
                    return "Tel";
                }

                @Override
                public String getValue() {
                    return "+" + code + " " + number;
                }
            };
            this.phoneNumber = phoneNumber.getValue();
            return phoneNumber;
        }
        return null;
    }

    public Social addTwitter(String twitterId) {
        return addSocialMedia("Twitter", twitterId);
    }

    public Social addInstagram(String instagramId) {
        return addSocialMedia("Instagram", instagramId);
    }

    public Social addSocialMedia(String title, String id) {
        if (socialMediaCount < 5) {
            Social social = new Social(title, id);
            socialMedia[socialMediaCount++] = social;
            return social;
        }
        return null;
    }

    public ContactInfo[] getInfo() {
        ContactInfo[] info = new ContactInfo[1 + (phoneNumber != null ? 1 : 0) + emailCount + socialMediaCount];
        info[0] = new NameContactInfo();
        int index = 1;
        if (phoneNumber != null) {
            info[index++] = new ContactInfo() {
                @Override
                public String getTitle() {
                    return "Tel";
                }

                @Override
                public String getValue() {
                    return phoneNumber;
                }
            };
        }
        for (int i = 0; i < emailCount; i++) {
            info[index++] = emails[i];
        }
        for (int i = 0; i < socialMediaCount; i++) {
            info[index++] = socialMedia[i];
        }
        return info;
    }

    private class NameContactInfo implements ContactInfo {
        @Override
        public String getTitle() {
            return "Name";
        }

        @Override
        public String getValue() {
            return name;
        }
    }

    public static class Email implements ContactInfo {
        private String value;

        public Email(String value) {
            this.value = value;
        }

        @Override
        public String getTitle() {
            return "Email";
        }

        @Override
        public String getValue() {
            return value;
        }
    }

    public static class Social implements ContactInfo {
        private String title;
        private String value;

        public Social(String title, String value) {
            this.title = title;
            this.value = value;
        }

        @Override
        public String getTitle() {
            return title;
        }

        @Override
        public String getValue() {
            return value;
        }
    }
}
