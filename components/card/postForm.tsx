import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '@/graphql/mutations/addPost.mutations';
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

const AddPostCard: React.FC<AddJobCardProps> = ({ isOpen, onClose }) => {
  const [createPost, { loading, error }] = useMutation(ADD_POST);
  const router = useRouter();
  const formik = useFormik({
    initialValues: {
      jobTitle: '',
      jobDescription: '',
      materialProvided: false,
      amount: '',
      numOfApplicants: 1,
    },
    validationSchema: Yup.object({
      jobTitle: Yup.string().required('Required'),
      jobDescription: Yup.string().required('Required'),
    }),
    onSubmit: (values) => {
      console.log(values);
      toast.success(`Success`);
      onClose();
      const postInput = {
        title: values.jobTitle,
        description: values.jobDescription,
        createdAt: '04-05-2024',
      };
      console.log(postInput);

      try {
        createPost({
          variables: {
            input: postInput,
          },
        })
          .then(() => toast.success(`Post Created`))
          .then(() => router.push(`/posts`))
          .catch((err) => {
            console.log(error), toast.error(err?.message);
          });
      } catch (err) {
        toast.error(`error creating Post`);
        console.log(err);
      }
    },
  });

  return (
    <Modal
      open={isOpen}
      onClose={onClose}
      aria-labelledby="add-post-modal-title"
      aria-describedby="add-post-modal-description"
    >
      <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', width: 400, bgcolor: 'background.paper', boxShadow: 24, p: 4 }}>
        <Typography id="add-post-modal-title" variant="h5" component="h2" gutterBottom>
          Add Post
        </Typography>
        <form onSubmit={formik.handleSubmit}>
          <TextField
            id="jobTitle"
            label="Post Title"
            variant="outlined"
            fullWidth
            value={formik.values.jobTitle}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
            helperText={formik.touched.jobTitle && formik.errors.jobTitle}
            margin="normal"
          />
          <TextField
            id="jobDescription"
            label="Post Description"
            variant="outlined"
            multiline
            rows={4}
            fullWidth
            value={formik.values.jobDescription}
            onChange={formik.handleChange}
            error={formik.touched.jobDescription && Boolean(formik.errors.jobDescription)}
            helperText={formik.touched.jobDescription && formik.errors.jobDescription}
            margin="normal"
          />
          <Button type="submit" variant="contained" color="primary" disabled={loading}>
            Submit
          </Button>
          <Button variant="contained" color="secondary" onClick={onClose} style={{ marginLeft: '10px' }}>
            Cancel
          </Button>
        </form>
      </Box>
    </Modal>
  );
};

export default AddPostCard;
