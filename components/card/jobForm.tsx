import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_JOB } from '@/graphql/mutations/addJob.mutations';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import {
  Box,
  Button,
  Modal,
  TextField,
  Typography
} from '@mui/material';

interface AddJobCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddJobCard: React.FC<AddJobCardProps> = ({ isOpen, onClose }) => {
  const initialRef = useRef<HTMLInputElement>(null);
  const finalRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [createJob, { loading, error }] = useMutation(ADD_JOB);
  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      jobDescription: '',
      materialProvided: false,
      amount: '',
      numOfApplicants: 1,
      status: 'Active'
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required('Required'),
      jobDescription: Yup.string().required('Required'),
      amount: Yup.number().required('Required'),
      numOfApplicants: Yup.number().required('Required'),
    }),
    onSubmit: async (values) => {
      const jobInput = {
        title: values.jobTitle,
        description: values.jobDescription,
        createdAt: '04-05-2024'
      };

      try {
        await createJob({
          variables: {
            input: jobInput,
          }
        });
        toast.success(`Job Created`);
        router.push(`/jobs`);
      } catch (err) {
        toast.error(`Error creating job`);
        console.error(err);
      }

      onClose();
    },
  });

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-job-modal"
      aria-describedby="add-job-modal-description"
    >
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: 400,
          bgcolor: 'background.paper',
          border: '2px solid #000',
          boxShadow: 24,
          p: 4,
          outline: 0,
          borderRadius: 2,
        }}
      >
        <form onSubmit={formik.handleSubmit}>
          <Typography id="add-job-modal-title" variant="h6" component="h2">
            Add Job
          </Typography>
          <div className="mb-4">
            <TextField
              id="jobTitle"
              label="Job Title"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.jobTitle}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
              helperText={formik.touched.jobTitle && formik.errors.jobTitle}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="jobDescription"
              label="Job Description"
              variant="outlined"
              fullWidth
              margin="normal"
              multiline
              rows={4}
              value={formik.values.jobDescription}
              onChange={formik.handleChange}
              error={formik.touched.jobDescription && Boolean(formik.errors.jobDescription)}
              helperText={formik.touched.jobDescription && formik.errors.jobDescription}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="amount"
              label="Amount"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.amount}
              onChange={formik.handleChange}
              error={formik.touched.amount && Boolean(formik.errors.amount)}
              helperText={formik.touched.amount && formik.errors.amount}
            />
          </div>
          <div className="mb-4">
            <TextField
              id="numOfApplicants"
              label="Number of Applicants"
              type="number"
              variant="outlined"
              fullWidth
              margin="normal"
              value={formik.values.numOfApplicants}
              onChange={formik.handleChange}
              error={formik.touched.numOfApplicants && Boolean(formik.errors.numOfApplicants)}
              helperText={formik.touched.numOfApplicants && formik.errors.numOfApplicants}
            />
          </div>
          <Box display="flex" justifyContent="space-between" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={loading}
            >
              Submit
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={onClose}
            >
              Cancel
            </Button>
          </Box>
        </form>
      </Box>
    </Modal>
  );
};

export default AddJobCard;
