import type { Lead } from "./LeadForm";

interface LeadStatsProps {
  leads: Lead[];
  totalLeads: number;
}

const LeadStats = ({ leads, totalLeads }: LeadStatsProps) => {
  const newLeads = leads.filter((lead) => lead.status === "New").length;
  const contacted = leads.filter((lead) => lead.status === "Contacted").length;
  const qualified = leads.filter((lead) => lead.status === "Qualified").length;
  const lost = leads.filter((lead) => lead.status === "Lost").length;

  return (
    <div className="mb-6 grid gap-4 md:grid-cols-5">
      <div className="rounded-lg bg-white p-4 shadow">
        <p className="text-sm text-gray-500">Total Leads</p>
        <h3 className="text-2xl font-bold">{totalLeads}</h3>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <p className="text-sm text-gray-500">New</p>
        <h3 className="text-2xl font-bold">{newLeads}</h3>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <p className="text-sm text-gray-500">Contacted</p>
        <h3 className="text-2xl font-bold">{contacted}</h3>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <p className="text-sm text-gray-500">Qualified</p>
        <h3 className="text-2xl font-bold">{qualified}</h3>
      </div>

      <div className="rounded-lg bg-white p-4 shadow">
        <p className="text-sm text-gray-500">Lost</p>
        <h3 className="text-2xl font-bold">{lost}</h3>
      </div>
    </div>
  );
};

export default LeadStats;