"use client";

import React, { useState } from "react";

import { HorizontalSelect } from "../../ui/horizontalSelect/HorizontalSelect";
import { Image } from "../../ui/image";
import { Link } from "../../ui/link";
import { Switch } from "../../ui/switch/Switch";
import type { IPricingProps } from "./types";

export function PricingTable({
  tiers,
  yearlyDiscountPercentage,
  extraServiceEnabled,
  extraService,
}: IPricingProps) {
  const [isYearly, setIsYearly] = useState(false);
  const [addExtraService, setAddExtraService] = useState(false);

  const getYearlyPrice = (monthlyPrice: number) => {
    if (monthlyPrice === 0) return 0;
    return (monthlyPrice * 12 * (yearlyDiscountPercentage / 100)).toFixed(2);
  };

  return (
    <div className="not-prose">
      <div className="sm:align-center relative sm:flex sm:flex-col">
        <HorizontalSelect
          className={"mb-12"}
          options={[
            { label: "Monthly", value: "monthly" },
            {
              label: "Yearly",
              value: "yearly",
              extraInfo: yearlyDiscountPercentage
                ? `${yearlyDiscountPercentage}% off`
                : undefined,
            },
          ]}
          selectedOption={isYearly ? "yearly" : "monthly"}
          onChange={(value) => {
            setIsYearly(value === "yearly");
          }}
        />

        {extraServiceEnabled && (
          <label className="absolute bottom-0 right-0 mb-4 flex items-center justify-end">
            <span className="mr-3 text-sm text-gray-500">
              {extraService?.text}
            </span>
            <Switch
              checked={addExtraService}
              onCheckedChange={setAddExtraService}
            />
          </label>
        )}
      </div>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-4">
        {tiers.map((tier) => {
          const monthlyPrice = tier.price
            ? addExtraService
              ? tier.price + (extraService?.cost || 0)
              : tier.price
            : 0;

          return (
            <div
              key={tier.name}
              className={`rounded-lg bg-gray-50 text-left shadow-sm ${
                tier.popular ? "ring-2 ring-blue-500" : ""
              }`}
            >
              <div className="p-6">
                <div className="flex items-center justify-between">
                  <h2 className="text-lg font-medium text-gray-900">
                    {tier.name}
                  </h2>

                  {tier.popular && (
                    <span className="rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-600">
                      Popular
                    </span>
                  )}
                </div>
                <div className="mt-4">
                  <Image
                    {...tier.icon}
                    className="size-12 text-gray-400"
                    fit="contain"
                  />
                </div>

                {tier.price !== undefined ? (
                  <p className="mt-8">
                    <span className="text-4xl font-extrabold text-gray-900">
                      €{isYearly ? getYearlyPrice(monthlyPrice) : monthlyPrice}
                    </span>
                    <span className="text-base font-medium text-gray-500">
                      {tier.price > 0 ? " seat" : ""}
                      {isYearly ? "/year" : "/month"}
                    </span>
                  </p>
                ) : (
                  <p className="mt-8 text-4xl font-extrabold text-gray-900">
                    Custom
                  </p>
                )}
                <p className="mt-4 text-sm text-gray-500">{tier.description}</p>
              </div>

              <div className="px-6 pb-8 pt-2">
                <Link
                  key={tier.cta.text}
                  {...tier.cta}
                  className="inline-block w-full"
                />

                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex items-start">
                      <div className="shrink-0">
                        <svg
                          className="size-6 text-green-500"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M5 13l4 4L19 7"
                          />
                        </svg>
                      </div>
                      <p className="ml-3 text-sm text-gray-700">{feature}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
