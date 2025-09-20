function StudentsPDF({ studentId }) {
    const openReportPdf = () => {
        window.open(`/students/${studentId}/report-pdf`, '_blank');
    };

    return (
        <button
            onClick={openReportPdf}
            className="btn btn-outline-primary"
        >
            View Report PDF
        </button>
    );
}

export default StudentsPDF;
