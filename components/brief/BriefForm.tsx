import {
  OBJECTIVE_OPTIONS,
  PLATFORM_OPTIONS,
  TONE_OPTIONS,
} from "@/lib/services/brief";

import type {
  BrandProfileSummary,
  BriefFormValues,
  Platform,
} from "@/types/brief";

interface BriefFormProps {
  brand: BrandProfileSummary;
  values: BriefFormValues;
  errors?: Partial<Record<keyof BriefFormValues, string>>;
  onChange: (values: BriefFormValues) => void;
  onSubmit: () => void;
  isSubmitting?: boolean;
}

export function BriefForm({
  brand,
  values,
  errors,
  onChange,
  onSubmit,
  isSubmitting = false,
}: BriefFormProps) {
  function updateField<K extends keyof BriefFormValues>(
    key: K,
    value: BriefFormValues[K]
  ) {
    onChange({
      ...values,
      [key]: value,
    });
  }

  function togglePlatform(platform: Platform) {
    const nextPlatforms = values.platforms.includes(platform)
      ? values.platforms.filter((p) => p !== platform)
      : [...values.platforms, platform];

    updateField("platforms", nextPlatforms);
  }

  return (
    <form
      className="w-full max-w-md space-y-4"
      onSubmit={(event) => {
        event.preventDefault();
        onSubmit();
      }}
    >
      <div>
        <h1 className="text-3xl font-bold">Creative Brief Builder</h1>

        <p className="mt-2 text-gray-600">
          Fill in your campaign details and generate a complete creative
          brief.
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Brand
        </label>

        <div className="border rounded p-2 bg-gray-50 text-gray-700">
          {brand.brandName}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Campaign Name
        </label>

        <input
          className="border rounded p-2 w-full"
          placeholder="Autumn Sneaker Drop"
          value={values.campaignName}
          onChange={(e) =>
            updateField("campaignName", e.target.value)
          }
        />

        {errors?.campaignName && (
          <p className="mt-1 text-sm text-red-600">
            {errors.campaignName}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Campaign Objective
        </label>

        <select
          className="border rounded p-2 w-full"
          value={values.objective}
          onChange={(e) =>
            updateField(
              "objective",
              e.target.value as BriefFormValues["objective"]
            )
          }
        >
          {OBJECTIVE_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Target Audience
        </label>

        <textarea
          className="border rounded p-2 w-full"
          rows={4}
          placeholder="Urban runners aged 18–30 who value sustainable products."
          value={values.targetAudience}
          onChange={(e) =>
            updateField("targetAudience", e.target.value)
          }
        />

        {errors?.targetAudience && (
          <p className="mt-1 text-sm text-red-600">
            {errors.targetAudience}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Tone of Voice
        </label>

        <select
          className="border rounded p-2 w-full"
          value={values.toneOfVoice}
          onChange={(e) =>
            updateField(
              "toneOfVoice",
              e.target.value as BriefFormValues["toneOfVoice"]
            )
          }
        >
          {TONE_OPTIONS.map((option) => (
            <option
              key={option.value}
              value={option.value}
            >
              {option.label}
            </option>
          ))}
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Platforms
        </label>

        <div className="border rounded p-3 space-y-2">
          {PLATFORM_OPTIONS.map((platform) => (
            <label
              key={platform.value}
              className="flex items-center gap-2"
            >
              <input
                type="checkbox"
                checked={values.platforms.includes(platform.value)}
                onChange={() =>
                  togglePlatform(platform.value)
                }
              />

              <span>{platform.label}</span>
            </label>
          ))}
        </div>

        {errors?.platforms && (
          <p className="mt-1 text-sm text-red-600">
            {errors.platforms}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Key Message
        </label>

        <textarea
          className="border rounded p-2 w-full"
          rows={4}
          placeholder="Built for the city. Made from what's already here."
          value={values.keyMessage}
          onChange={(e) =>
            updateField("keyMessage", e.target.value)
          }
        />

        {errors?.keyMessage && (
          <p className="mt-1 text-sm text-red-600">
            {errors.keyMessage}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Call To Action
        </label>

        <input
          className="border rounded p-2 w-full"
          placeholder="Shop the collection today"
          value={values.callToAction}
          onChange={(e) =>
            updateField("callToAction", e.target.value)
          }
        />

        {errors?.callToAction && (
          <p className="mt-1 text-sm text-red-600">
            {errors.callToAction}
          </p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Deadline
        </label>

        <input
          type="date"
          className="border rounded p-2 w-full"
          value={values.deadline}
          onChange={(e) =>
            updateField("deadline", e.target.value)
          }
        />

        {errors?.deadline && (
          <p className="mt-1 text-sm text-red-600">
            {errors.deadline}
          </p>
        )}
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded bg-black p-2 text-white disabled:opacity-50"
      >
        {isSubmitting
          ? "Generating brief..."
          : "Generate Brief"}
      </button>
    </form>
  );
}
