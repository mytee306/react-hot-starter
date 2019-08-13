import { CommentCount, DiscussionEmbed } from 'disqus-react';
import env from 'env';
import { startCase } from 'lodash';
import React, { ComponentProps } from 'react';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import { Box } from 'rebass';

const shortname = 'react-hot-starter-dev';

type DisqusConfig = ComponentProps<typeof CommentCount>['config'];

export interface DisqusProps extends RouteComponentProps {
  title?: DisqusConfig['title'];
  identifier?: DisqusConfig['identifier'];
}

const Disqus: React.FC<DisqusProps> = ({
  title,
  identifier,
  match: { url, path },
}) => {
  const disqusConfig: DisqusConfig = {
    url: env.publicUrl,
    title: title || startCase(path),
    identifier: identifier || url,
  };

  return (
    <Box mt={40}>
      <CommentCount shortname={shortname} config={disqusConfig} />
      <DiscussionEmbed shortname={shortname} config={disqusConfig} />
    </Box>
  );
};
export default withRouter(Disqus);
