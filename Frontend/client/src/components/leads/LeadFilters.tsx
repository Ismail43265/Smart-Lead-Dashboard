interface LeadFiltersProps {
  search: string;
  status: string;
  source: string;
  sort: string;
  onSearchChange: (value: string) => void;
  onStatusChange: (value: string) => void;
  onSourceChange: (value: string) => void;
  onSortChange: (value: string) => void;
  onExport: () => void;
}

const LeadFilters = ({
  search,
  status,
  source,
  sort,
  onSearchChange,
  onStatusChange,
  onSourceChange,
  onSortChange,
  onExport,
}: LeadFiltersProps) => {
  return (
    <div className="mb-5 grid gap-3 rounded-lg bg-gray-100 p-4 shadow md:grid-cols-5">
      <input
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search name or email"
        className="rounded border px-3 py-2"
      />

      <select
        value={status}
        onChange={(e) => onStatusChange(e.target.value)}
        className="rounded border px-3 py-2"
      >
        <option value="">All Status</option>
        <option value="New">New</option>
        <option value="Contacted">Contacted</option>
        <option value="Qualified">Qualified</option>
        <option value="Lost">Lost</option>
      </select>

      <select
        value={source}
        onChange={(e) => onSourceChange(e.target.value)}
        className="rounded border px-3 py-2"
      >
        <option value="">All Sources</option>
        <option value="Website">Website</option>
        <option value="Instagram">Instagram</option>
        <option value="Referral">Referral</option>
      </select>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value)}
        className="rounded border px-3 py-2"
      >
        <option value="latest">Latest</option>
        <option value="oldest">Oldest</option>
      </select>

      <button
        onClick={onExport}
        className="rounded bg-green-600 px-4 py-2 text-white"
      >
        Export CSV
      </button>
    </div>
  );
};

export default LeadFilters;