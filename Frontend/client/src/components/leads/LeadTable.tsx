import type { Lead } from "./LeadForm";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

interface LeadTableProps {
  leads: Lead[];
  currentUser: CurrentUser | null;
  onEdit: (lead: Lead) => void;
  onDelete: (id: string) => void;
}

const LeadTable = ({
  leads,
  currentUser,
  onEdit,
  onDelete,
}: LeadTableProps) => {
  if (leads.length === 0) {
    return (
      <div className="rounded-lg bg-white p-6 text-center shadow">
        <h3 className="text-lg font-bold">No leads found</h3>
        <p className="text-gray-500">Create a lead or change filters.</p>
      </div>
    );
  }

  return (
    <div className="overflow-x-auto rounded-lg bg-white shadow">
      <table className="w-full min-w-[850px] text-left">
        <thead className="bg-gray-200">
          <tr>
            <th className="p-3">Name</th>
            <th className="p-3">Email</th>
            <th className="p-3">Status</th>
            <th className="p-3">Source</th>
            <th className="p-3">Created By</th>
            <th className="p-3">Created At</th>
            <th className="p-3">Action</th>
          </tr>
        </thead>

        <tbody>
          {leads.map((lead) => (
            <tr key={lead._id} className="border-b">
              <td className="p-3">{lead.name}</td>
              <td className="p-3">{lead.email}</td>
              <td className="p-3">{lead.status}</td>
              <td className="p-3">{lead.source}</td>
              <td className="p-3">{lead.createdBy?.name || "-"}</td>
              <td className="p-3">
                {new Date(lead.createdAt).toLocaleDateString()}
              </td>
              <td className="p-3">
                <div className="flex gap-2">
                  <button
                    onClick={() => onEdit(lead)}
                    className="rounded bg-yellow-500 px-3 py-1 text-white"
                  >
                    Edit
                  </button>

                  {currentUser?.role === "admin" && (
                    <button
                      onClick={() => onDelete(lead._id)}
                      className="rounded bg-red-600 px-3 py-1 text-white"
                    >
                      Delete
                    </button>
                  )}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LeadTable;