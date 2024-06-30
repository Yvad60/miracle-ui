import React from "react";
import "./../styles/global.css";
import styles from "./progress.module.css";
import { SemanticColor, semanticColors } from "../../lib/colors";
import classNames from "classnames";
import { ProgressRadius, ProgressSizes, radii, sizes } from "./constants";

interface ProgressProps {
  color?: SemanticColor;
  size?: ProgressSizes;
  radius?: ProgressRadius;
  value?: number;
  maxValue?: number;
  label?: string;
  ariaLabel?: string;
  valueLabel?: string;
  showPercentageLabel?: boolean;
  isIndeterminate?: boolean;
}

export const Progress = ({
  color = semanticColors.primary,
  size = sizes.sm,
  radius = radii.full,
  label,
  valueLabel,
  value = 20,
  maxValue = 100,
  ariaLabel = "Loading...",
  showPercentageLabel,
  isIndeterminate,
}: ProgressProps) => {
  const percentage = (value / maxValue) * 100;
  const translateXValue = 100 - percentage;

  return (
    <div className={styles.progressContainer}>
      <div
        className={styles.progressSecondContainer}
        aria-label={ariaLabel}
        aria-valuemin={0}
        aria-valuemax={maxValue}
        role="progressbar"
      >
        {label && (
          <div
            className={classNames(styles.labelContainer, {
              [styles[`text-${size}`]]: size,
            })}
          >
            <span>{label}</span>
            {showPercentageLabel && <span>{percentage}%</span>}
            {valueLabel && <span>{valueLabel}</span>}
          </div>
        )}
        <div
          className={classNames(styles.progressWrap, {
            [`${color}`]: color,
            [styles[`size-${size}`]]: size,
            [styles[`radius-${radius}`]]: radius,
          })}
        >
          <div
            className={classNames(styles.progress, {
              [`${color}`]: color,
              [styles["is-indeterminate"]]: isIndeterminate,
            })}
            style={{
              height: "100%",
              transition: "transform 0.5s",
              transitionTimingFunction: "cubic-bezier(.4,0,.2,1)",
              transform: `translateX(-${translateXValue}%)`,
            }}
          >
            {" "}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Progress;
