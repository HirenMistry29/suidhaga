import React, { useRef } from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useMutation } from '@apollo/client';
import { ADD_POST } from '@/graphql/mutations/addPost.mutations';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';


interface AddJobCardProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddPostCard: React.FC<AddJobCardProps> = ({ isOpen, onClose }) => {

  const[createPost , { loading, error}] = useMutation(ADD_POST)
  const router = useRouter()
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
      toast.success(`Success`)
      onClose();
      const postInput = {title:values.jobTitle , description:values.jobDescription , createdAt : '04-05-2024'}
      console.log(postInput);
      
      try {
        createPost({
            variables: {
                input: postInput,
            }
        })
            .then(() => toast.success(`Post Created`))
            .then(()=>router.push(`/posts`))
            .catch((err) => { console.log(error) , toast.error(err?.message)})
    } catch (err) {
        toast.error(`error creating Post`)
        console.log(err);
    }
    },
  });

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg p-8">
            <form onSubmit={formik.handleSubmit}>
              <div className="mb-4">
                <label htmlFor="jobTitle" className="block font-bold mb-2">Post Title:</label>
                <input
                  id="jobTitle"
                  type="text"
                  className="w-full border rounded-md p-2"
                  value={formik.values.jobTitle}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
                {formik.touched.jobTitle && formik.errors.jobTitle? (
                  <div className="text-red-500 mt-1">{formik.errors.jobTitle}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="jobDescription" className="block font-bold mb-2">Post Description:</label>
                <textarea
                  id="jobDescription"
                  className="w-full border rounded-md p-2"
                  value={formik.values.jobDescription}
                  onChange={formik.handleChange}
                />
                {formik.touched.jobDescription && formik.errors.jobDescription? (
                  <div className="text-red-500 mt-1">{formik.errors.jobDescription}</div>
                ) : null}
              </div>
              {/* <div className="mb-4">
                <label className="block font-bold mb-2">Material Provided:</label>
                <div>
                  <label className="mr-4">
                    <input
                      type="radio"
                      name="materialProvided"
                      value="true"
                      className="mr-2"
                      {...formik.getFieldProps('materialProvided')}
                    />
                    Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="materialProvided"
                      value="false"
                      className="mr-2"
                      {...formik.getFieldProps('materialProvided')}
                    />
                    No
                  </label>
                </div>
              </div> */}
              {/* <div className="mb-4">
                <label htmlFor="amount" className="block font-bold mb-2">Amount:</label>
                <input
                  id="amount"
                  type="number"
                  className="w-full border rounded-md p-2"
                  value={formik.values.amount}
                  onChange={formik.handleChange}
                />
                {formik.touched.amount && formik.errors.amount? (
                  <div className="text-red-500 mt-1">{formik.errors.amount}</div>
                ) : null}
              </div>
              <div className="mb-4">
                <label htmlFor="numOfApplicants" className="block font-bold mb-2">Number of Applicants:</label>
                <input
                  id="numOfApplicants"
                  type="number"
                  className="w-full border rounded-md p-2"
                  value={formik.values.numOfApplicants}
                  onChange={formik.handleChange}
                />
                {formik.touched.numOfApplicants && formik.errors.numOfApplicants? (
                  <div className="text-red-500 mt-1">{formik.errors.numOfApplicants}</div>
                ) : null}
              </div> */}
              <div className="flex justify-between">
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">Submit</button>
                <button type="button" className="bg-gray-400 text-white py-2 px-4 rounded hover:bg-gray-500" onClick={onClose}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default AddPostCard;