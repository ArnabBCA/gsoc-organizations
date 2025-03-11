"use client";
import React from "react";
import { Button } from "./ui/button";
import { X } from "lucide-react";
import { useQueryParams } from "@/hooks/useQueryParams";

const ResetFiters = () => {
  const { resetParams } = useQueryParams();
  return (
    <Button variant="destructive" onClick={resetParams}>
      <X />
      Reset
    </Button>
  );
};

export default ResetFiters;
