import { CheckCircleIcon } from "@heroicons/react/24/outline";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";

const steps = [
  { name: "Order Placed", description: "on Thu, 27th Nov", value: "PLACED" },
  {
    name: "Packed",
    description: "Item Packed in Dispatch Warehouse",
    value: "CONFIRM",
  },
  { name: "Shipped", description: "by Sat, 29th Nov", value: "SHIPPED" },
  { name: "Arriving", description: "by 3 Dec - 7 Dec", value: "ARRIVING" },
  { name: "Arrived", description: "on Sun, 7th Dec", value: "DELIVERED" },
];

const canceledStep = [
  { name: "Order Placed", description: "on Thu, 27 Nov", value: "PLACED" },
  { name: "Order Canceled", description: "on Thu, 27 Nov", value: "CANCELLED" },
];

const OrderStepper = ({ orderStatus }) => {
  const [statusSteps, setStatusSteps] = useState([]);

  useEffect(() => {
    if (orderStatus === "CANCELLED") {
      setStatusSteps(canceledStep);
    } else {
      setStatusSteps(steps);
    }
  }, [orderStatus]);

  const currentStep = statusSteps.findIndex(
    (step) => step.value === orderStatus
  );

  return (
    <div>
      <Box className="my-10">
        {statusSteps.map((step, index) => (
          <div key={index} className="flex px-4">
            <div className="flex flex-col items-center mb-4">
              {/* Step Circle */}
              <Box
                sx={{ zIndex: -1 }}
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  index <= currentStep
                    ? "bg-gray-200 text-custom"
                    : "bg-gray-300 text-gray-600"
                }`}
              >
                {step.value === orderStatus ? (
                  <CheckCircleIcon className="w-5 h-5" />
                ) : (
                  <FiberManualRecordIcon sx={{ zIndex: -1 }} />
                )}
              </Box>
              {/* Vertical Line */}
              {statusSteps.length - 1 !== index && (
                <div
                  className={`w-[2px] h-20 ${
                    index < currentStep ? "bg-custom" : "bg-gray-300"
                  }`}
                ></div>
              )}
            </div>
            {/* Step Details */}
            <div className="ml-2 w-full">
              <div
                className={`p-2 font-medium rounded-md ${
                  orderStatus === "CANCELLED" && step.value === orderStatus
                    ? "bg-red-500 text-white"
                    : step.value === orderStatus
                    ? "bg-custom text-white"
                    : ""
                }`}
              >
                <p>{step.name}</p>
                <p
                  className={`text-xs ${
                    step.value === orderStatus
                      ? "text-gray-200"
                      : "text-gray-500"
                  }`}
                >
                  {step.description}
                </p>
              </div>
            </div>
          </div>
        ))}
      </Box>
    </div>
  );
};

export default OrderStepper;
