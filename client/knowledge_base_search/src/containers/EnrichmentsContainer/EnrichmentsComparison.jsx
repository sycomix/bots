import React, { Component } from 'react';
import { string, number, shape } from 'prop-types';
import { Icon } from 'watson-react-components';
import classNames from 'classnames';
import ResultContainer from '../ResultContainer/ResultContainer';
import replaceNewlines from '../../utils/replaceNewlines';
import './styles.css';

class EnrichmentsComparison extends Component {
  getRankDisplay = () => {
    const { enrichedResult: { originalRank }, index } = this.props;
    const enrichedRank = index + 1;
    if (originalRank && enrichedRank !== originalRank) {
      const relativeRank = enrichedRank < originalRank ? 'up' : 'down';
      return (
        <div className={classNames(`enrichments_comparison--rank-${relativeRank}`)}>
          <Icon type="up" />
          <span>Watson moved this answer {relativeRank} based on enrichment filtering</span>
        </div>
      );
    }
    return null;
  }

  render() {
    const { regularResult, enrichedResult, index } = this.props;
    const isFirst = index === 0;

    return (
      <div className="enrichments_comparison">
        <div className="enrichments_comparison--content">
          <div className="enrichments_comparison--content_left">
            { isFirst && (<h5>Standard search</h5>) }
            { regularResult && (
              <ResultContainer
                resultText={replaceNewlines(regularResult.text)}
                resultRank={index + 1}
              />
            )
            }
          </div>
          <div className="enrichments_comparison--content_right">
            { isFirst && (<h5>Enrichment search</h5>) }
            { enrichedResult && (
              <ResultContainer
                resultText={replaceNewlines(enrichedResult.text)}
                resultRank={index + 1}
              >
                { this.getRankDisplay() }
              </ResultContainer>
            )
            }
          </div>
        </div>
      </div>
    );
  }
}

EnrichmentsComparison.propTypes = {
  regularResult: shape({
    text: string.isRequired,
  }),
  enrichedResult: shape({
    text: string.isRequired,
    originalRank: number.isRequired,
  }),
  index: number.isRequired,
};

EnrichmentsComparison.defaultProps = {
  regularResult: null,
  enrichedResult: null,
};

export default EnrichmentsComparison;
