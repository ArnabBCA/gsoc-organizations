"use client";

import React from "react";
import { useQueryParams } from "@/hooks/useQueryParams";
import { CheckboxList } from "@/components/CheckboxList";
import { TOPICS } from "@/constants";

const TopicCheckbox = () => {
  const { selectedValues: selectedTopics, handleChange: handleTopicChange } =
    useQueryParams("topics", []);

  return (
    <CheckboxList
      items={Object.keys(TOPICS)}
      selectedItems={selectedTopics}
      handleItemChange={handleTopicChange}
      labelFn={(topicName) => {
        return `${topicName} (${TOPICS[topicName]})`;
      }}
      filterTitleType="Topic"
    />
  );
};

export default TopicCheckbox;
