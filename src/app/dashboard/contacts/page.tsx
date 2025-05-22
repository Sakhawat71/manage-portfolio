import MessageList from '@/components/modules/dashboard/contact/messageList';
import { getAllContacts } from '@/services/contact';
import React from 'react';

const ContactsPage =async () => {

    const contactData = await getAllContacts();

    return (
        <div className="p-5">
            <h1 className="text-2xl font-semibold mb-5">Messages</h1>
            <MessageList messages={contactData?.data} />
        </div>
    );
};

export default ContactsPage;