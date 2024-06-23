import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import toast from "react-hot-toast";
import { CREATE_COMMENT } from "@/graphql/mutations/comment.mutation";
import { useMutation } from "@apollo/client";
import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import styled from "styled-components";

// Define a styled component for the scrollable div
const ScrollableDiv = styled.div`
  overflow-y: auto;
  max-height: 300px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
`;

interface ChildProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageSrc: StaticImport;
  title: string;
  postId: string;
}

const CommentCard: React.FC<ChildProp> = ({ isOpen, setIsOpen, imageSrc, title, postId }) => {
  const [body, setBody] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUpload = async () => {
    try {
      await createComment({
        variables: {
          postId,
          body,
        },
      });
      toast.success("Comment added successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Error adding comment.");
    }
  };

  return (
    <Modal open={isOpen} onClose={() => setIsOpen(false)}>
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          bgcolor: "background.paper",
          boxShadow: 24,
          p: 4,
          width: "40%",
          borderRadius: 2,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box display="flex" justifyContent="space-between" borderBottom={1} borderColor="grey.400">
          <Typography variant="h6">Comments</Typography>
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseOutlined />
          </IconButton>
        </Box>

        <Box display="flex" flexDirection="row" mt={2} borderBottom={1} borderColor="grey.400" pb={2}>
          <Image alt="ecommerce" className="w-[15%] h-[25%]" src={imageSrc} />
          <Typography variant="subtitle1" className="ml-4 font-semibold">{title}</Typography>
        </Box>

        <Box display="flex" flexDirection="row" mt={2} gap={2} pb={2}>
          <TextField
            fullWidth
            variant="outlined"
            placeholder="My Comment"
            name="comment"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            inputProps={{ maxLength: 20 }}
          />
          <Button
            onClick={handleUpload}
            variant="contained"
            color="secondary"
            sx={{ bgcolor: "#C84869", ":hover": { bgcolor: "#961638" } }}
          >
            Upload
          </Button>
        </Box>

        <ScrollableDiv className="text-sm px-4 overflow-auto h-50 bg-gray-100" id="scrollable-div">
          <Box display="flex" flexDirection="row">
            <Typography variant="body2" fontWeight="bold" pr={1}>Nikhil</Typography>
            <Typography variant="body2">Beautiful</Typography>
          </Box>
          <Box display="flex" flexDirection="row">
            <Typography variant="body2" fontWeight="bold" pr={1}>Aditya</Typography>
            <Typography variant="body2">Amazing</Typography>
          </Box>
          <Button
            onClick={toggleExpansion}
            sx={{ mt: 2, color: "gray", ":hover": { color: "black" } }}
          >
            {isExpanded ? "Hide comments..." : "...View all comments"}
          </Button>
          {isExpanded && (
            <Box mt={2}>
              <Box display="flex" flexDirection="row">
                <Typography variant="body2" fontWeight="bold" pr={1}>Nikhil</Typography>
                <Typography variant="body2">Beautiful</Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="body2" fontWeight="bold" pr={1}>Aditya</Typography>
                <Typography variant="body2">Amazing</Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="body2" fontWeight="bold" pr={1}>Nikhil</Typography>
                <Typography variant="body2">Beautiful</Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="body2" fontWeight="bold" pr={1}>Aditya</Typography>
                <Typography variant="body2">Amazing</Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="body2" fontWeight="bold" pr={1}>Nikhil</Typography>
                <Typography variant="body2">Beautiful</Typography>
              </Box>
              <Box display="flex" flexDirection="row">
                <Typography variant="body2" fontWeight="bold" pr={1}>Aditya</Typography>
                <Typography variant="body2">Amazing</Typography>
              </Box>
            </Box>
          )}
        </ScrollableDiv>
      </Box>
    </Modal>
  );
};

export default CommentCard;
