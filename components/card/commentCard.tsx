import React, { useEffect, useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import toast from "react-hot-toast";
import { CREATE_COMMENT } from "@/graphql/mutations/comment.mutation";
import { useMutation, useQuery } from "@apollo/client";
import { Modal, Box, Typography, TextField, Button, IconButton } from "@mui/material";
import styled from "styled-components";
import { GET_POST_COMMENTS } from "@/graphql/queries/comments.queries";
import InfiniteScroll from 'react-infinite-scroll-component';
import { Avatar, List, Skeleton } from "antd";

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

interface commentinput {
  postId: String;
  body: String;
}

const CommentCard: React.FC<ChildProp> = ({ isOpen, setIsOpen, imageSrc, title, postId }) => {
  const [body, setBody] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT);
  const [comments, setComments] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);

  const { loading: commentsLoading, error: commentsError, data, fetchMore } = useQuery(GET_POST_COMMENTS, {
    variables: { postId, offset: 0, limit: 10 },
    notifyOnNetworkStatusChange: true,
  });

  useEffect(() => {
    console.log(data);
    
    if (data) {
      setComments(data.getPostComments);
      console.log(`From commments: `,data.getPostComments);

      if (data.getPostComments.length < 10) {
        setHasMore(false);
      }
    }
  }, [data]);


  useEffect(() => {
    console.log('CommentCard isOpen:', isOpen);
  }, [isOpen]);

  if (commentsError) {
    console.error("Error fetching comments:", commentsError);
  }

  const loadMoreComments = () => {
    fetchMore({
      variables: {
        offset: comments.length,
      },
      updateQuery: (prev, { fetchMoreResult }) => {
        if (!fetchMoreResult) return prev;
        if (fetchMoreResult.getPostComments.length < 10) {
          setHasMore(false);
        }
        return {
          ...prev,
          getPostComments: [...prev.getPostComments, ...fetchMoreResult.getPostComments],
        };
      },
    });
  };

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };

  const handleUpload = async () => {

    const commentinput = {
      postId: postId,
      body: body
    }

    try {
      await createComment({
        variables: {
          input: commentinput
        },
      });
      toast.success("Comment added successfully!");
      setBody("")
    } catch (err) {
      console.error(err);
      toast.error("Error adding comment.");
    }
  };

  // if (commentsLoading && !data) return <Skeleton active />;
  // if (commentsError) return <p>Error: {commentsError.message}</p>;

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

        {/* <ScrollableDiv className="text-sm px-4 overflow-auto h-50 bg-gray-100" id="scrollable-div">
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
        </ScrollableDiv> */}
        <div style={{ height: "400px", overflow: "auto" }} id="scrollable-div">
          <InfiniteScroll
            dataLength={comments.length}
            next={loadMoreComments}
            hasMore={!commentsLoading && hasMore}
            loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
            scrollableTarget="scrollable-div"
          >
            <List
              dataSource={comments}
              renderItem={comment => (
                <List.Item key={comment.id}>
                  <List.Item.Meta
                    avatar={<Avatar>{comment.body.charAt(0)}</Avatar>}
                    title={comment.body}
                  />
                </List.Item>
              )}
            >
              {loading && hasMore && (
                <div className="loading-container">
                  <Skeleton avatar paragraph={{ rows: 3 }} active />
                </div>
              )}
            </List>
          </InfiniteScroll>
        </div>
      </Box>
    </Modal>
  );
};

export default CommentCard;
