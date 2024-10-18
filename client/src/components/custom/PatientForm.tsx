import React from "react";
import { Formik, Field, FieldArray, Form, FormikErrors } from "formik";
import { z } from "zod";
import { toFormikValidationSchema } from "zod-formik-adapter";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { axiosInstance } from "@/constants/axiosInstance";
import toast from "react-hot-toast";

// Define Zod schema for validation
const patientSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  age: z
    .number({
      required_error: "Age is required",
      invalid_type_error: "Age must be a number",
    })
    .positive("Age must be a positive number"),
  condition: z.string().min(1, "Condition is required"),
  medicalHistory: z.array(
    z.object({
      date: z.string().min(1, "Date is required"),
      treatment: z.string().min(1, "Treatment is required"),
      notes: z.string().min(1, "Notes are required"),
    })
  ),
  medications: z.array(
    z.object({
      name: z.string().min(1, "Medication name is required"),
      dosage: z.string().min(1, "Dosage is required"),
      startDate: z.string().min(1, "Start date is required"),
      endDate: z.string().min(1, "End date is required"),
    })
  ),
  labResults: z.array(
    z.object({
      date: z.string().min(1, "Date is required"),
      test: z.string().min(1, "Test name is required"),
      result: z.string().min(1, "Result is required"),
    })
  ),
});

type PatientFormData = z.infer<typeof patientSchema>;

interface PatientFormProps {
  onSubmit: (values: PatientFormData) => void;
}

const initialValues: PatientFormData = {
  name: "",
  age: 0,
  condition: "",
  medicalHistory: [{ date: "", treatment: "", notes: "" }],
  medications: [{ name: "", dosage: "", startDate: "", endDate: "" }],
  labResults: [{ date: "", test: "", result: "" }],
};

const PatientForm: React.FC<PatientFormProps> = ({ onSubmit }) => {
  const [success, setSuccess] = React.useState(false);

  const handleSubmit = async (values: PatientFormData) => {
    try {
      console.log(values);
      const { data } = await axiosInstance.post("/patient", values);
      console.log(data);
      if (data.success) {
        toast.success("patient added successfully");
      }
      setSuccess(true);
      onSubmit(values);
    } catch (error) {
      console.error("Error adding task", error);
    }
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={toFormikValidationSchema(patientSchema)}
      onSubmit={handleSubmit}
    >
      {({
        values,
        errors,
        touched,
        handleChange,
        handleBlur,
        setFieldValue,
      }) => (
        <Form className="container mx-auto p-4 space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Patient Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    name="name"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.name}
                  />
                  {touched.name && errors.name && (
                    <div className="text-red-500 text-sm">{errors.name}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="age">Age</Label>
                  <Input
                    id="age"
                    name="age"
                    type="number"
                    min="0"
                    onChange={(e) => {
                      const value =
                        e.target.value === "" ? 0 : Number(e.target.value);
                      setFieldValue("age", value);
                    }}
                    onBlur={handleBlur}
                    value={values.age === 0 ? "" : values.age}
                  />
                  {touched.age && errors.age && (
                    <div className="text-red-500 text-sm">{errors.age}</div>
                  )}
                </div>
                <div className="space-y-2">
                  <Label htmlFor="condition">Condition</Label>
                  <Input
                    id="condition"
                    name="condition"
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.condition}
                  />
                  {touched.condition && errors.condition && (
                    <div className="text-red-500 text-sm">
                      {errors.condition}
                    </div>
                  )}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Medical History */}
          <Card>
            <CardHeader>
              <CardTitle>Medical History</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FieldArray name="medicalHistory">
                {({ push, remove }) => (
                  <>
                    {values.medicalHistory.map((_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg"
                      >
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Field
                            name={`medicalHistory.${index}.date`}
                            type="date"
                            as={Input}
                          />
                          {touched.medicalHistory?.[index]?.date &&
                            errors.medicalHistory?.[index]?.date && (
                              <div className="text-red-500 text-sm">
                                {
                                  (
                                    errors.medicalHistory[
                                      index
                                    ] as FormikErrors<
                                      (typeof values.medicalHistory)[0]
                                    >
                                  ).date
                                }
                              </div>
                            )}
                        </div>
                        <div className="space-y-2">
                          <Label>Treatment</Label>
                          <Field
                            name={`medicalHistory.${index}.treatment`}
                            as={Input}
                          />
                          {touched.medicalHistory?.[index]?.treatment &&
                            errors.medicalHistory?.[index]?.treatment && (
                              <div className="text-red-500 text-sm">
                                {
                                  (
                                    errors.medicalHistory[
                                      index
                                    ] as FormikErrors<
                                      (typeof values.medicalHistory)[0]
                                    >
                                  ).treatment
                                }
                              </div>
                            )}
                        </div>
                        <div className="space-y-2">
                          <Label>Notes</Label>
                          <Field
                            name={`medicalHistory.${index}.notes`}
                            as={Textarea}
                          />
                          {touched.medicalHistory?.[index]?.notes &&
                            errors.medicalHistory?.[index]?.notes && (
                              <div className="text-red-500 text-sm">
                                {
                                  (
                                    errors.medicalHistory[
                                      index
                                    ] as FormikErrors<
                                      (typeof values.medicalHistory)[0]
                                    >
                                  ).notes
                                }
                              </div>
                            )}
                        </div>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        push({ date: "", treatment: "", notes: "" })
                      }
                    >
                      Add Medical History
                    </Button>
                  </>
                )}
              </FieldArray>
            </CardContent>
          </Card>

          {/* Medications */}
          <Card>
            <CardHeader>
              <CardTitle>Medications</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FieldArray name="medications">
                {({ push, remove }) => (
                  <>
                    {values.medications.map((_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4 border rounded-lg"
                      >
                        <div className="space-y-2">
                          <Label>Medication Name</Label>
                          <Field
                            name={`medications.${index}.name`}
                            as={Input}
                          />
                          {touched.medications?.[index]?.name &&
                            errors.medications?.[index]?.name && (
                              <div className="text-red-500 text-sm">
                                {
                                  (
                                    errors.medications[index] as FormikErrors<
                                      (typeof values.medications)[0]
                                    >
                                  ).name
                                }
                              </div>
                            )}
                        </div>
                        <div className="space-y-2">
                          <Label>Dosage</Label>
                          <Field
                            name={`medications.${index}.dosage`}
                            as={Input}
                          />
                          {touched.medications?.[index]?.dosage &&
                            errors.medications?.[index]?.dosage && (
                              <div className="text-red-500 text-sm">
                                {
                                  (
                                    errors.medications[index] as FormikErrors<
                                      (typeof values.medications)[0]
                                    >
                                  ).dosage
                                }
                              </div>
                            )}
                        </div>
                        <div className="space-y-2">
                          <Label>Start Date</Label>
                          <Field
                            name={`medications.${index}.startDate`}
                            type="date"
                            as={Input}
                          />
                          {touched.medications?.[index]?.startDate &&
                            errors.medications?.[index]?.startDate && (
                              <div className="text-red-500 text-sm">
                                {
                                  (
                                    errors.medications[index] as FormikErrors<
                                      (typeof values.medications)[0]
                                    >
                                  ).startDate
                                }
                              </div>
                            )}
                        </div>
                        <div className="space-y-2">
                          <Label>End Date</Label>
                          <Field
                            name={`medications.${index}.endDate`}
                            type="date"
                            as={Input}
                          />
                          {touched.medications?.[index]?.endDate &&
                            errors.medications?.[index]?.endDate && (
                              <div className="text-red-500 text-sm">
                                {
                                  (
                                    errors.medications[index] as FormikErrors<
                                      (typeof values.medications)[0]
                                    >
                                  ).endDate
                                }
                              </div>
                            )}
                        </div>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() =>
                        push({
                          name: "",
                          dosage: "",
                          startDate: "",
                          endDate: "",
                        })
                      }
                    >
                      Add Medication
                    </Button>
                  </>
                )}
              </FieldArray>
            </CardContent>
          </Card>

          {/* Lab Results */}
          <Card>
            <CardHeader>
              <CardTitle>Lab Results</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <FieldArray name="labResults">
                {({ push, remove }) => (
                  <>
                    {values.labResults.map((_, index) => (
                      <div
                        key={index}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4 border rounded-lg"
                      >
                        <div className="space-y-2">
                          <Label>Date</Label>
                          <Field
                            name={`labResults.${index}.date`}
                            type="date"
                            as={Input}
                          />
                          {touched.labResults?.[index]?.date &&
                            errors.labResults?.[index]?.date && (
                              <div className="text-red-500 text-sm">
                                {
                                  (
                                    errors.labResults[index] as FormikErrors<
                                      (typeof values.labResults)[0]
                                    >
                                  ).date
                                }
                              </div>
                            )}
                        </div>
                        <div className="space-y-2">
                          <Label>Test Name</Label>
                          <Field name={`labResults.${index}.test`} as={Input} />
                          {touched.labResults?.[index]?.test &&
                            errors.labResults?.[index]?.test && (
                              <div className="text-red-500 text-sm">
                                {
                                  (
                                    errors.labResults[index] as FormikErrors<
                                      (typeof values.labResults)[0]
                                    >
                                  ).test
                                }
                              </div>
                            )}
                        </div>
                        <div className="space-y-2">
                          <Label>Result</Label>
                          <Field
                            name={`labResults.${index}.result`}
                            as={Input}
                          />
                          {touched.labResults?.[index]?.result &&
                            errors.labResults?.[index]?.result && (
                              <div className="text-red-500 text-sm">
                                {
                                  (
                                    errors.labResults[index] as FormikErrors<
                                      (typeof values.labResults)[0]
                                    >
                                  ).result
                                }
                              </div>
                            )}
                        </div>
                        {index > 0 && (
                          <Button
                            type="button"
                            variant="destructive"
                            onClick={() => remove(index)}
                          >
                            Remove
                          </Button>
                        )}
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => push({ date: "", test: "", result: "" })}
                    >
                      Add Lab Result
                    </Button>
                  </>
                )}
              </FieldArray>
            </CardContent>
          </Card>

          {/* Submit Button */}
          <Card className="flex justify-between p-4">
            <Button type="reset" variant="outline">
              Reset Form
            </Button>
            <Button type="submit">Save Patient Data</Button>
          </Card>

          {/* Success Message */}
          {success && (
            <Alert className="bg-green-100">
              <AlertDescription className="text-green-600">
                Patient data saved successfully!
              </AlertDescription>
            </Alert>
          )}
        </Form>
      )}
    </Formik>
  );
};

export default PatientForm;
