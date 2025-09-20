import { router } from '@inertiajs/react';

function EmailReportButton({ studentId }) {
    const sendEmailReport = () => {
        router.get(`/students/${studentId}/email-report`);
    };

    return (
        <button
            onClick={sendEmailReport}
            className="btn btn-success"
        >
            Send Report to Email
        </button>
    );
}

export default EmailReportButton;
