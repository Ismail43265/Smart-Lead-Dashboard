import { useEffect, useState, type ChangeEvent, type SyntheticEvent } from "react";

export type LeadStatus = "New" | "Contacted" | "Qualified" | "Lost";
export type LeadSource = "Website" | "Instagram" | "Referral";

export interface LeadFormData {
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
}

export interface Lead {
  _id: string;
  name: string;
  email: string;
  status: LeadStatus;
  source: LeadSource;
  createdAt: string;
  updatedAt: string;
  createdBy?: {
    _id: string;
    name: string;
    email: string;
    role: "admin" | "user";
  };
}

interface LeadFormProps {
  editingLead: Lead | null;
  onSubmit: (data: LeadFormData) => Promise<void>;
  onCancel: () => void;
}

const LeadForm = ({ editingLead, onSubmit, onCancel }: LeadFormProps) => {
  const [formData, setFormData] = useState<LeadFormData>({
    name: "",
    email: "",
    status: "New",
    source: "Website",
  });

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (editingLead) {
      setFormData({
        name: editingLead.name,
        email: editingLead.email,
        status: editingLead.status,
        source: editingLead.source,
      });
    } else {
      setFormData({
        name: "",
        email: "",
        status: "New",
        source: "Website",
      });
    }
  }, [editingLead]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!formData.name.trim() || !formData.email.trim()) {
      alert("Name and email are required");
      return;
    }

    try {
      setLoading(true);
      await onSubmit(formData);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mb-6 rounded-lg bg-gray-100 p-5 shadow">
      <h2 className="mb-4 text-xl font-bold text-blue-600">
        {editingLead ? "Update Lead" : "Create Lead"}
      </h2>

      <form onSubmit={handleSubmit} className="grid gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block">Name</label>
          <input
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Rahul Sharma"
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block">Email</label>
          <input
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="rahul@example.com"
            className="w-full rounded border px-3 py-2"
          />
        </div>

        <div>
          <label className="mb-1 block">Status</label>
          <select
            name="status"
            value={formData.status}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          >
            <option value="New">New</option>
            <option value="Contacted">Contacted</option>
            <option value="Qualified">Qualified</option>
            <option value="Lost">Lost</option>
          </select>
        </div>

        <div>
          <label className="mb-1 block">Source</label>
          <select
            name="source"
            value={formData.source}
            onChange={handleChange}
            className="w-full rounded border px-3 py-2"
          >
            <option value="Website">Website</option>
            <option value="Instagram">Instagram</option>
            <option value="Referral">Referral</option>
          </select>
        </div>

        <div className="flex gap-3 md:col-span-2">
          <button
            type="submit"
            disabled={loading}
            className="rounded bg-blue-600 px-5 py-2 text-white disabled:opacity-60"
          >
            {loading ? "Saving..." : editingLead ? "Update Lead" : "Create Lead"}
          </button>

          {editingLead && (
            <button
              type="button"
              onClick={onCancel}
              className="rounded bg-gray-500 px-5 py-2 text-white"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default LeadForm;