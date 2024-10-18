import { NextFunction, Request, Response } from "express";
import { ParsedQs } from "qs";
import patientModel from "../../model/patient.model";
import { getPatientQuerySchema } from "../../utils/validation/patientsValidation";

interface GetPatientsQuery extends ParsedQs {
  limit?: string;
  offset?: string;
  search?: string;
  sortBy?: string;
  sortOrder?: string;
  ageMin?: string;
  ageMax?: string;
  condition?: string;
  startDate?: string;
  endDate?: string;
}

const getPatients = async (
  req: Request<{}, {}, {}, GetPatientsQuery>,
  res: Response,
  next: NextFunction
) => {
  try {
    const {
      limit = "10",
      offset = "0",
      search = "",
      sortBy = "createdAt",
      sortOrder = "desc",
      ageMin,
      ageMax,
      condition,
      startDate,
      endDate,
    } = req.query;

    const { error } = getPatientQuerySchema.validate(req.query);

    const query: Record<string, any> = {};

    if (search) {
      query.$or = [
        { name: { $regex: search, $options: "i" } },
        { condition: { $regex: search, $options: "i" } },
      ];
    }

    if (ageMin || ageMax) {
      query.age = {};
      if (ageMin) query.age.$gte = parseInt(ageMin);
      if (ageMax) query.age.$lte = parseInt(ageMax);
    }

    if (condition) {
      query.condition = { $regex: condition, $options: "i" };
    }

    if (startDate || endDate) {
      query["medicalHistory.date"] = {};
      if (startDate) query["medicalHistory.date"].$gte = new Date(startDate);
      if (endDate) query["medicalHistory.date"].$lte = new Date(endDate);
    }

    const limitNum = Math.min(Math.max(1, Number(limit)), 100);
    const offsetNum = Math.max(0, Number(offset));

    const sort: Record<string, 1 | -1> = {
      [sortBy]: sortOrder === "asc" ? 1 : -1,
    };

    const [patients, total] = await Promise.all([
      patientModel
        .find(query)
        .limit(limitNum)
        .skip(offsetNum)
        .sort(sort)
        .select("-__v")
        .lean(),
      patientModel.countDocuments(query),
    ]);

    const totalPages = Math.ceil(total / limitNum);
    const currentPage = Math.floor(offsetNum / limitNum) + 1;
    const hasNextPage = currentPage < totalPages;
    const hasPrevPage = currentPage > 1;

    res.json({
      success: true,
      data: {
        patients,
        pagination: {
          total,
          totalPages,
          currentPage,
          limit: limitNum,
          offset: offsetNum,
          hasNextPage,
          hasPrevPage,
        },
        filtering: {
          search,
          ageMin,
          ageMax,
          condition,
          startDate,
          endDate,
        },
        sorting: {
          sortBy,
          sortOrder,
        },
      },
    });
  } catch (error) {
    console.error("getPatients : ", error);
    next(error);
  }
};

export default getPatients;
