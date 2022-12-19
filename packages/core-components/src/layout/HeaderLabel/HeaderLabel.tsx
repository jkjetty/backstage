/*
 * Copyright 2020 The Backstage Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-i/core';
import Typography from '@material-ui/core/Typography';
import React from 'react';
import { Link } from '../../components/Link';

/** @public */
export type HeaderLabelClassKey = 'root' | 'label' | 'value';

const useStyles = makeStyles<Theme, HeaderLabelProps>(
  theme => ({
    root: {
      textAlign: 'left',
    },
    label: {
      color: theme.palette.common.white,
      fontWeight: theme.typography.fontWeightBold,
      letterSpacing: 0,
      fontSize: theme.typography.fontSize,
      marginBottom: theme.spacing(1) / 2,
      lineHeight: 1,
    },
    value: props => ({
      padding: '2px',
      color: 'rgba(255, 255, 255, 0.8)',
      fontSize: theme.typography.fontSize,
      lineHeight: 1,
      ...(props.highlight
        ? {
            outline: `1px solid ${theme.palette.common.white}`,
            borderRadius: '2px',
          }
        : {}),
    }),
  }),
  { name: 'BackstageHeaderLabel' },
);

type HeaderLabelContentProps = {
  value: React.ReactNode;
  className: string;
};

const HeaderLabelContent = ({ value, className }: HeaderLabelContentProps) => (
  <Typography className={className}>{value}</Typography>
);

type HeaderLabelProps = {
  label: string;
  value?: HeaderLabelContentProps['value'];
  url?: string;
  highlight?: boolean;
};

/**
 * Additional label to main {@link Header}
 *
 * @public
 *
 */
export function HeaderLabel(props: HeaderLabelProps) {
  const { label, value, url } = props;
  const classes = useStyles(props);
  const content = (
    <HeaderLabelContent
      className={classes.value}
      value={value || '<Unknown>'}
    />
  );
  return (
    <Grid item>
      <Typography component="span" className={classes.root}>
        <Typography className={classes.label}>{label}</Typography>
        {url ? <Link to={url}>{content}</Link> : content}
      </Typography>
    </Grid>
  );
}

HeaderLabel.defaultProps = {
  highlight: false,
};
