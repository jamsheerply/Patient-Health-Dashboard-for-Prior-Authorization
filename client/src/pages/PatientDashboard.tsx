import { useEffect, useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import AuthRequestForm from "@/components/custom/AuthRequestForm";
import PatientForm from "@/components/custom/PatientForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Eye,
  FileText,
  FlaskConical,
  Pill,
  Plus,
  Send,
  Search,
} from "lucide-react";
import { axiosInstance } from "@/constants/axiosInstance";
import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "@/redux/store";
import { userLogout } from "@/redux/actions/user.action";

const PatientDashboard = () => {
  const [isDialogOpenAddPatient, setIsDialogOpenAddPatient] = useState(false);
  const [isDialogOpenRequest, setIsDialogOpenRequest] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const [patients, setPatients] = useState([]);
  const [PriorAuthorization, setPriorAuthorization] = useState();
  const [pagination, setPagination] = useState({});
  const [filters, setFilters] = useState({
    search: "",
    ageMin: "",
    ageMax: "",
    condition: "",
    startDate: "",
    endDate: "",
  });
  const [sorting, setSorting] = useState({
    sortBy: "createdAt",
    sortOrder: "desc",
  });
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    console.log("Selected Patient:", selectedPatient);

    const fetchAuthorization = async () => {
      try {
        if (selectedPatient && selectedPatient._id) {
          const { data } = await axiosInstance.get(
            `/auth-request/${selectedPatient._id}`
          );
          setPriorAuthorization(data.data);
          // Process the fetched data as needed
          console.log("Authorization Data:", data);
        }
      } catch (error) {
        console.error("Error fetching authorization:", error);
      }
    };

    // Call the fetch function
    fetchAuthorization();
  }, [selectedPatient]);

  const fetchPatients = async (page = 1) => {
    try {
      const limit = 8; // Adjust as needed
      const offset = (page - 1) * limit;
      const queryParams = new URLSearchParams({
        limit: limit.toString(),
        offset: offset.toString(),
        search: filters.search,
        sortBy: sorting.sortBy,
        sortOrder: sorting.sortOrder,
        ...(filters.ageMin && { ageMin: filters.ageMin }),
        ...(filters.ageMax && { ageMax: filters.ageMax }),
        ...(filters.condition && { condition: filters.condition }),
        ...(filters.startDate && { startDate: filters.startDate }),
        ...(filters.endDate && { endDate: filters.endDate }),
      });

      const { data } = await axiosInstance.get(`/patient?${queryParams}`);
      setPatients(data.data.patients);
      setPagination(data.data.pagination);
    } catch (error) {
      console.error("Error fetching patients:", error);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, [filters, sorting]);

  const handleSearch = (e) => {
    setFilters({ ...filters, search: e.target.value });
  };

  const handleSort = (e) => {
    const [sortBy, sortOrder] = e.target.value.split("-");
    setSorting({ sortBy, sortOrder });
  };

  const handleRequestClick = (patient) => {
    setSelectedPatient(patient);
    setIsDialogOpenRequest(true);
  };

  const handlePageChange = (page) => {
    fetchPatients(page);
  };

  const handleLogout = async () => {
    await dispatch(userLogout());
  };
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Section */}
      <header className="sticky top-0 bg-white shadow-sm z-50">
        <div className="container mx-auto px-4 py-4">
          {/* Title and Avatar Row */}
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-extrabold truncate">
              Patient Dashboard
            </h1>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <Avatar className="h-8 w-8 md:h-10 md:w-10">
                  <AvatarImage src="https://github.com/shadcn.png" />
                  <AvatarFallback>CN</AvatarFallback>
                </Avatar>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuLabel>Patient Dashboard</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={() => navigate("/")}>
                  Home
                </DropdownMenuItem>
                <DropdownMenuItem onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Search, Sort, and Add Button Row */}
          <div className="flex flex-col sm:flex-row gap-4 sm:items-center sm:justify-between">
            {/* Search Bar */}
            <div className="relative flex-1 max-w-md">
              <input
                type="text"
                placeholder="Search a member"
                className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm"
                value={filters.search}
                onChange={handleSearch}
              />
              <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
            </div>

            {/* Sort and Add Patient */}
            <div className="flex flex-wrap gap-3 items-center justify-between sm:justify-end">
              <div className="flex items-center gap-2 min-w-[140px]">
                <span className="text-sm text-gray-600 whitespace-nowrap">
                  Sort by
                </span>
                <select
                  className="px-2 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm flex-1"
                  onChange={handleSort}
                  value={`${sorting.sortBy}-${sorting.sortOrder}`}
                >
                  <option value="createdAt-desc">Newest</option>
                  <option value="createdAt-asc">Oldest</option>
                  <option value="name-asc">Name A-Z</option>
                  <option value="name-desc">Name Z-A</option>
                  <option value="age-asc">Age (Low to High)</option>
                  <option value="age-desc">Age (High to Low)</option>
                </select>
              </div>

              <Dialog
                open={isDialogOpenAddPatient}
                onOpenChange={setIsDialogOpenAddPatient}
              >
                <DialogTrigger asChild>
                  <Button
                    variant="outline"
                    className="whitespace-nowrap text-sm"
                  >
                    <Plus className="mr-2 h-4 w-4" />
                    Add Patient
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle>Add New Patient</DialogTitle>
                    <DialogDescription>
                      Fill in the patient details below
                    </DialogDescription>
                  </DialogHeader>
                  <PatientForm
                    onSubmit={() => setIsDialogOpenAddPatient(false)}
                  />
                </DialogContent>
              </Dialog>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-6">
        {/* Patient Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 md:gap-6">
          {patients.map((member, index) => (
            <Card
              key={index}
              className="hover:shadow-lg transition-shadow duration-300"
            >
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="relative mb-4">
                    <div className="w-12 h-12 md:w-16 md:h-16 rounded-full bg-gray-100 flex items-center justify-center text-xl md:text-2xl font-semibold">
                      {member.name.charAt(0)}
                    </div>
                  </div>

                  <h3 className="text-lg md:text-xl font-semibold mb-1 line-clamp-1">
                    {member.name}
                  </h3>
                  <p className="text-gray-500 text-sm mb-2">
                    Age: {member.age}
                  </p>
                  <p className="font-medium mb-4 text-sm md:text-base">
                    {member.condition}
                  </p>

                  <div className="flex flex-col sm:flex-row gap-2 w-full justify-center">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto text-sm"
                          onClick={() => {
                            setSelectedPatient(member);
                          }}
                        >
                          <Eye className="mr-1 h-4 w-4" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle className="text-2xl md:text-3xl font-bold mb-2 text-center">
                            Patient Details
                          </DialogTitle>
                          <DialogDescription className="text-center text-base md:text-lg">
                            Information for {member.name}
                          </DialogDescription>
                        </DialogHeader>

                        <div className="mt-6 space-y-6">
                          Basic Information
                          <section className="bg-gray-100 p-4 md:p-6 rounded-lg shadow-md">
                            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
                              <Avatar className="mr-2 h-8 w-8">
                                <AvatarFallback>
                                  {member.name.charAt(0)}
                                </AvatarFallback>
                              </Avatar>
                              Basic Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                              <p>
                                <strong>Name:</strong> {member.name}
                              </p>
                              <p>
                                <strong>Age:</strong> {member.age}
                              </p>
                              <p>
                                <strong>Condition:</strong> {member.condition}
                              </p>
                            </div>
                          </section>
                          {/* Medical History */}
                          <section className="bg-blue-50 p-4 md:p-6 rounded-lg shadow-md">
                            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
                              <FileText className="mr-2 h-5 w-5" />
                              Medical History
                            </h3>

                            {member.medicalHistory &&
                            member.medicalHistory.length > 0 ? (
                              <ul className="list-disc list-inside text-gray-600">
                                {member.medicalHistory.map((history) => (
                                  <li key={history._id}>
                                    <strong>Date:</strong>{" "}
                                    {new Date(
                                      history.date
                                    ).toLocaleDateString()}{" "}
                                    <br />
                                    <strong>Treatment:</strong>{" "}
                                    {history.treatment} <br />
                                    <strong>Notes:</strong> {history.notes}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-600">
                                No medical history available
                              </p>
                            )}
                          </section>
                          {/* Medications */}
                          <section className="bg-green-50 p-4 md:p-6 rounded-lg shadow-md">
                            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
                              <Pill className="mr-2 h-5 w-5" />
                              Medications
                            </h3>

                            {member.medications &&
                            member.medications.length > 0 ? (
                              <ul className="list-disc list-inside text-gray-600">
                                {member.medications.map((medication) => (
                                  <li key={medication._id}>
                                    <strong>Name:</strong> {medication.name}{" "}
                                    <br />
                                    <strong>Dosage:</strong> {medication.dosage}{" "}
                                    <br />
                                    <strong>Start Date:</strong>{" "}
                                    {new Date(
                                      medication.startDate
                                    ).toLocaleDateString()}{" "}
                                    <br />
                                    <strong>End Date:</strong>{" "}
                                    {new Date(
                                      medication.endDate
                                    ).toLocaleDateString() || "Ongoing"}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-600">
                                No medications recorded
                              </p>
                            )}
                          </section>
                          {/* Lab Results */}
                          <section className="bg-purple-50 p-4 md:p-6 rounded-lg shadow-md">
                            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
                              <FlaskConical className="mr-2 h-5 w-5" />
                              Lab Results
                            </h3>

                            {member.labResults &&
                            member.labResults.length > 0 ? (
                              <ul className="list-disc list-inside text-gray-600">
                                {member.labResults.map((result) => (
                                  <li key={result._id}>
                                    <strong>Date:</strong>{" "}
                                    {new Date(result.date).toLocaleDateString()}{" "}
                                    <br />
                                    <strong>Test:</strong> {result.test} <br />
                                    <strong>Result:</strong> {result.result}
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-600">
                                No lab results available
                              </p>
                            )}
                          </section>
                          {/* Prior Authorization*/}
                          <section className="bg-purple-50 p-4 md:p-6 rounded-lg shadow-md">
                            <h3 className="text-lg md:text-xl font-semibold mb-4 flex items-center">
                              <FlaskConical className="mr-2 h-5 w-5" />
                              Prior Authorization Requests
                            </h3>

                            {PriorAuthorization &&
                            PriorAuthorization.length > 0 ? (
                              <ul className="list-disc pl-5">
                                {PriorAuthorization.map((request) => (
                                  <li key={request._id} className="mb-2">
                                    <p>
                                      <strong>Treatment Type:</strong>{" "}
                                      {request.treatmentType}
                                    </p>
                                    <p>
                                      <strong>Insurance Plan:</strong>{" "}
                                      {request.insurancePlan}
                                    </p>
                                    <p>
                                      <strong>Date of Service:</strong>{" "}
                                      {new Date(
                                        request.dateOfService
                                      ).toLocaleDateString()}
                                    </p>
                                    <p>
                                      <strong>Diagnosis Code:</strong>{" "}
                                      {request.diagnosisCode}
                                    </p>
                                    <p>
                                      <strong>Status:</strong> {request.status}
                                    </p>
                                    <p>
                                      <strong>Doctor Notes:</strong>{" "}
                                      {request.doctorNotes}
                                    </p>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="text-gray-600">
                                No prior authorization requests available.
                              </p>
                            )}
                          </section>
                        </div>
                      </DialogContent>
                    </Dialog>

                    <Dialog
                      open={isDialogOpenRequest}
                      onOpenChange={setIsDialogOpenRequest}
                    >
                      <DialogTrigger asChild>
                        <Button
                          variant="outline"
                          className="w-full sm:w-auto text-sm"
                          onClick={() => handleRequestClick(member)}
                        >
                          <Send className="mr-2 h-4 w-4" />
                          Request
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                          <DialogTitle>Authorization Request</DialogTitle>
                          <DialogDescription>
                            Submit authorization request for{" "}
                            {selectedPatient?.name}
                          </DialogDescription>
                        </DialogHeader>
                        <AuthRequestForm
                          patientId={selectedPatient?._id}
                          onSubmit={() => {
                            setIsDialogOpenRequest(false);
                            setSelectedPatient(null);
                          }}
                        />
                      </DialogContent>
                    </Dialog>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Pagination */}
        <div className="mt-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  href="#"
                  onClick={() => handlePageChange(pagination.currentPage - 1)}
                  disabled={!pagination.hasPrevPage}
                />
              </PaginationItem>
              {[...Array(pagination.totalPages)].map((_, index) => (
                <PaginationItem key={index} className="hidden sm:inline-block">
                  <PaginationLink
                    href="#"
                    onClick={() => handlePageChange(index + 1)}
                    isActive={pagination.currentPage === index + 1}
                  >
                    {index + 1}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  href="#"
                  onClick={() => handlePageChange(pagination.currentPage + 1)}
                  disabled={!pagination.hasNextPage}
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </main>
    </div>
  );
};

export default PatientDashboard;
