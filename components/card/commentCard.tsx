import React, { useState } from "react";
import { CloseOutlined } from "@ant-design/icons";
import Image from "next/image";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import toast from "react-hot-toast";
import { CREATE_COMMENT } from "@/graphql/mutations/comment.mutation";
import { useMutation, useQuery } from "@apollo/client";
import styled from "styled-components";
import { GET_POSTS } from "@/graphql/queries/post.queries";

interface ChildProp {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  imageSrc: StaticImport;
  title: string;
  postId: string;
  body: string;
}

// Define a styled component for the scrollable div
const ScrollableDiv = styled.div`
  overflow-y: auto;
  max-height: 300px;

  &::-webkit-scrollbar {
    display: none;
  }

  -ms-overflow-style: none;
`;

const CommentCard: React.FC<ChildProp> = ({
  isOpen,
  setIsOpen,
  imageSrc,
  title,
  postId,
}) => {
  const [body, setBody] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpansion = () => {
    setIsExpanded(!isExpanded);
  };
  // const { loading, error, data } = useQuery(GET_POSTS);
  const [createComment, { loading, error }] = useMutation(CREATE_COMMENT);

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
    isOpen && (
      <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
        <div className="bg-white rounded-lg p-8 w-[40%] flex flex-col">
          <div className="flex justify-between border-b border-gray-400">
            <span>Comments</span>
            <CloseOutlined
              className="hover:font-bold hover:text-lg cursor-pointer"
              onClick={() => setIsOpen(false)}
            />
          </div>

          <div className="flex flex-row mt-4 border-b border-gray-400 pb-4">
            <Image alt="ecommerce" className="w-[15%] h-[25%]" src={imageSrc} />
            <span className="ml-4 font-semibold">{title}</span>
          </div>

          <div className="flex flex-row mt-4 gap-4 pb-4">
            <input
              type="text"
              placeholder="My Comment"
              name="comment"
              value={body}
              onChange={(e) => setBody(e.target.value)}
              className="border-none rounded-md outline-none w-full bg-gray-100 px-4"
              maxLength={20}
            />
            <button
              onClick={handleUpload}
              className="py-2 px-4 rounded-md bg-[#C84869] hover:bg-[#961638] text-white"
            >
              Upload
            </button>
          </div>

          {/* Use the ScrollableDiv styled component */}
          <ScrollableDiv
            className="text-sm px-4 overflow-auto h-50 bg-gray-100"
            id="scrollable-div"
          >
            <div className="flex flex-row">
              <span className="text-sm font-semibold pr-2">Nikhil</span>
              Beautifull
            </div>
            <div className="flex flex-row">
              <span className="text-sm font-semibold pr-2">Aditya</span>Amazing
            </div>
            <button
              onClick={toggleExpansion}
              className="mt-2 text-gray-500 hover:text-black"
            >
              {isExpanded ? "Hide comments..." : "...View all comments"}
            </button>
            {isExpanded && (
              <div className="mt-2">
                <div className="flex flex-row">
                  <span className="text-sm font-semibold pr-2">Nikhil</span>
                  Beautifull
                </div>
                <div className="flex flex-row">
                  <span className="text-sm font-semibold pr-2">Aditya</span>
                  Amazing
                </div>
                <div className="flex flex-row">
                  <span className="text-sm font-semibold pr-2">Nikhil</span>
                  Beautifull
                </div>
                <div className="flex flex-row">
                  <span className="text-sm font-semibold pr-2">Aditya</span>
                  Amazing
                </div>
                <div className="flex flex-row">
                  <span className="text-sm font-semibold pr-2">Nikhil</span>
                  Beautifull
                </div>
                <div className="flex flex-row">
                  <span className="text-sm font-semibold pr-2">Aditya</span>
                  Amazing
                </div>
              </div>
            )}
          </ScrollableDiv>
        </div>
      </div>
    )
  );
};

export default CommentCard;
