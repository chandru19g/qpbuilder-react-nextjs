import React from "react";
import { useForm, useFieldArray } from "react-hook-form";

type FormValues = {
  QuestionPaper: {
    name: string;
  }[];
};

interface Props {
  index: number;
}

const SectionA: React.FC<Props> = ({ index }) => {
  const { register, control, handleSubmit } = useForm<FormValues>();

  const { fields, append, remove } = useFieldArray({
    name: "QuestionPaper",
    control,
  });

  return (
    <div className="flex justify-center items-center flex-wrap xl:justify-center flex-col">
      <div className="text-xl">Section {index + 1}</div>
      {fields.map(({ id }, index) => {
        return (
          <div className="items-center flex mt-5" key={id}>
            <label htmlFor="question" className="flex items-start">
              {index + 1}. {"\t"}
            </label>
            <input
              placeholder="Enter The Question"
              {...register(`QuestionPaper.${index}.name`)}
              className="bg-gray-100 p-1 ml-5"
            />
            <button
              type="button"
              onClick={() => remove(index)}
              className="items-center"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        );
      })}
      <div className="flex flex-row p-5">
        <button
          type="button"
          onClick={() => append({ name: "" })}
          className="w-40 p-1 bg-green-400 mt-5 items-center justify-center flex flex-row rounded-lg"
        >
          Add Question
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 justify-center items-center"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M10 5a1 1 0 011 1v3h3a1 1 0 110 2h-3v3a1 1 0 11-2 0v-3H6a1 1 0 110-2h3V6a1 1 0 011-1z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default SectionA;
