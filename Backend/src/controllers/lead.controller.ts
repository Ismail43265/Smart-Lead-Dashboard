import {Request , Response} from "express";
import {Lead} from "../models/lead.model";

interface LeadQuery {
  page?: string;
  status?: string;
  source?: string;
  search?: string;
  sort?: string;
}

export const createLead = async (req: Request, res: Response): Promise<void>=>{
    try{
         const {name, email, status, source}= req.body;

        if(!req.user){
            res.status(401).json({
                success: false,
                message: "Not authorized"
            });
            return;
        }

        const lead= await Lead.create({
            name,
            email,
            status,
            source,
            createdBy: req.user.id,
        });
        res.status(201).json({
            success: true,
            message: "Lead created successfully",
            data: lead,
        });
    }
    catch(error){
        res.status(500).json({
            success: false,
            message: "Failed to create lead",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}

export const getLeads = async (
  req: Request<{}, {}, {}, LeadQuery>,
  res: Response
): Promise<void> => {
  try {
    const {
      page = "1",
      status,
      source,
      search,
      sort = "latest",
    } = req.query;

    const limit = 10;
    const currentPage = Math.max(Number(page) || 1, 1);
    const skip = (currentPage - 1) * limit;

    const query: Record<string, unknown> = {};

    if (status) {
      query.status = status;
    }

    if (source) {
      query.source = source;
    }

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
      ];
    }

    const sortOption =
      sort === "oldest"
        ? ({ createdAt: 1 } as const)
        : ({ createdAt: -1 } as const);

    const [leads, totalLeads] = await Promise.all([
      Lead.find(query)
        .populate("createdBy", "name email role")
        .sort(sortOption)
        .skip(skip)
        .limit(limit),
      Lead.countDocuments(query),
    ]);

    res.status(200).json({
      success: true,
      message: "Leads fetched successfully",
      data: leads,
      pagination: {
        totalLeads,
        currentPage,
        totalPages: Math.ceil(totalLeads / limit),
        limit,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch leads",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const getSingleLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id).populate(
      "createdBy",
      "name email role"
    );

    if (!lead) {
      res.status(404).json({
        success: false,
        message: "Lead not found",
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Lead fetched successfully",
      data: lead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch lead",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const updateLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, status, source } = req.body;

    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404).json({
        success: false,
        message: "Lead not found",
      });
      return;
    }

    if (name !== undefined) lead.name = name;
    if (email !== undefined) lead.email = email;
    if (status !== undefined) lead.status = status;
    if (source !== undefined) lead.source = source;

    const updatedLead = await lead.save();

    res.status(200).json({
      success: true,
      message: "Lead updated successfully",
      data: updatedLead,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update lead",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const deleteLead = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const lead = await Lead.findById(req.params.id);

    if (!lead) {
      res.status(404).json({
        success: false,
        message: "Lead not found",
      });
      return;
    }

    await lead.deleteOne();

    res.status(200).json({
      success: true,
      message: "Lead deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to delete lead",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};