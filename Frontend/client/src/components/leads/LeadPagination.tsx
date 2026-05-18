interface LeadPaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const LeadPagination = ({
  page,
  totalPages,
  onPageChange,
}: LeadPaginationProps) => {
  if (totalPages <= 1) return null;

  return (
    <div className="mt-5 flex items-center justify-between rounded-lg bg-white p-4 shadow">
      <button
        disabled={page === 1}
        onClick={() => onPageChange(page - 1)}
        className="rounded bg-gray-700 px-4 py-2 text-white disabled:opacity-50"
      >
        Previous
      </button>

      <p>
        Page {page} of {totalPages}
      </p>

      <button
        disabled={page === totalPages}
        onClick={() => onPageChange(page + 1)}
        className="rounded bg-gray-700 px-4 py-2 text-white disabled:opacity-50"
      >
        Next
      </button>
    </div>
  );
};

export default LeadPagination;