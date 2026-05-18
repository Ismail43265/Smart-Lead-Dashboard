import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import LeadForm from "../components/leads/LeadForm";
import type { Lead, LeadFormData } from "../components/leads/LeadForm";
import LeadFilters from "../components/leads/LeadFilters";
import LeadStats from "../components/leads/LeadStats";
import LeadTable from "../components/leads/LeadTable";
import LeadPagination from "../components/leads/LeadPagination";

interface CurrentUser {
  id: string;
  name: string;
  email: string;
  role: "admin" | "user";
}

const Dashboard = () => {
  const navigate = useNavigate();

  const [leads, setLeads] = useState<Lead[]>([]);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [authLoading, setAuthLoading] = useState(true);

  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const [status, setStatus] = useState("");
  const [source, setSource] = useState("");
  const [sort, setSort] = useState("latest");

  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalLeads, setTotalLeads] = useState(0);

  const [loading, setLoading] = useState(false);

  const API_URL = import.meta.env.VITE_API_BASE_URL;

  const fetchCurrentUser = async () => {
    try {
      const res = await axios.get(`${API_URL}/auth/me`, {
        withCredentials: true,
      });

      setCurrentUser(res.data.user);
    } catch (error) {
      console.log(error);
      navigate("/login", { replace: true });
    } finally {
      setAuthLoading(false);
    }
  };

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
      setPage(1);
    }, 500);

    return () => clearTimeout(timer);
  }, [search]);

  const fetchLeads = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API_URL}/leads`, {
        params: {
          page,
          search: debouncedSearch || undefined,
          status: status || undefined,
          source: source || undefined,
          sort,
        },
        withCredentials: true,
      });

      setLeads(res.data.data);
      setTotalPages(res.data.pagination.totalPages);
      setTotalLeads(res.data.pagination.totalLeads);
    } catch (error) {
      console.log(error);
      alert("Failed to fetch leads");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      fetchLeads();
    }
  }, [currentUser, page, debouncedSearch, status, source, sort]);

  const handleCreateOrUpdate = async (data: LeadFormData) => {
    try {
      if (editingLead) {
        await axios.put(`${API_URL}/leads/${editingLead._id}`, data, {
          withCredentials: true,
        });

        alert("Lead updated successfully");
      } else {
        await axios.post(`${API_URL}/leads`, data, {
          withCredentials: true,
        });

        alert("Lead created successfully");
      }

      setEditingLead(null);
      fetchLeads();
    } catch (error) {
      console.log(error);
      alert("Failed to save lead");
    }
  };

  const handleDelete = async (id: string) => {
    const confirmDelete = confirm("Are you sure you want to delete this lead?");
    if (!confirmDelete) return;

    try {
      await axios.delete(`${API_URL}/leads/${id}`, {
        withCredentials: true,
      });

      alert("Lead deleted successfully");
      fetchLeads();
    } catch (error) {
      console.log(error);
      alert("Only admin can delete leads");
    }
  };

  const handleExportCSV = () => {
    if (leads.length === 0) {
      alert("No leads to export");
      return;
    }

    const headers = ["Name", "Email", "Status", "Source", "Created At"];

    const rows = leads.map((lead) => [
      lead.name,
      lead.email,
      lead.status,
      lead.source,
      new Date(lead.createdAt).toLocaleDateString(),
    ]);

    const csvContent = [headers, ...rows]
      .map((row) => row.map((value) => `"${value}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], {
      type: "text/csv;charset=utf-8;",
    });

    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "leads.csv";
    link.click();

    URL.revokeObjectURL(url);
  };

  const handleLogout = async () => {
    try {
      await axios.post(
        `${API_URL}/auth/logout`,
        {},
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.log(error);
    } finally {
      navigate("/login", { replace: true });
    }
  };

  if (authLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        Checking authentication...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-8">
      <div className="mx-auto max-w-7xl">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Smart Leads Dashboard
            </h1>
            <p className="text-gray-600">
              Manage leads with search, filters and pagination
            </p>

            {currentUser && (
              <p className="mt-1 text-sm text-gray-500">
                Logged in as {currentUser.name} ({currentUser.role})
              </p>
            )}
          </div>

          <button
            onClick={handleLogout}
            className="rounded bg-red-600 px-4 py-2 text-white"
          >
            Logout
          </button>
        </div>

        <LeadStats leads={leads} totalLeads={totalLeads} />

        <LeadForm
          editingLead={editingLead}
          onSubmit={handleCreateOrUpdate}
          onCancel={() => setEditingLead(null)}
        />

        <LeadFilters
          search={search}
          status={status}
          source={source}
          sort={sort}
          onSearchChange={setSearch}
          onStatusChange={(value) => {
            setStatus(value);
            setPage(1);
          }}
          onSourceChange={(value) => {
            setSource(value);
            setPage(1);
          }}
          onSortChange={(value) => {
            setSort(value);
            setPage(1);
          }}
          onExport={handleExportCSV}
        />

        {loading ? (
          <div className="rounded-lg bg-white p-6 text-center shadow">
            Loading leads...
          </div>
        ) : (
          <>
            <LeadTable
              leads={leads}
              currentUser={currentUser}
              onEdit={setEditingLead}
              onDelete={handleDelete}
            />

            <LeadPagination
              page={page}
              totalPages={totalPages}
              onPageChange={setPage}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;