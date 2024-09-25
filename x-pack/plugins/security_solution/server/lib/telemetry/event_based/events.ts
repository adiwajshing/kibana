/*
 * Copyright Elasticsearch B.V. and/or licensed to Elasticsearch B.V. under one
 * or more contributor license agreements. Licensed under the Elastic License
 * 2.0; you may not use this file except in compliance with the Elastic License
 * 2.0.
 */
import type { EventTypeOpts } from '@kbn/core/server';
import type { BulkUpsertAssetCriticalityRecordsResponse } from '../../../../common/api/entity_analytics';
import type { DataStream, IlmPolicy, IlmStats, IndexStats } from '../indices.metadata.types';

export const RISK_SCORE_EXECUTION_SUCCESS_EVENT: EventTypeOpts<{
  scoresWritten: number;
  taskDurationInSeconds: number;
  interval: string;
  alertSampleSizePerShard: number;
}> = {
  eventType: 'risk_score_execution_success',
  schema: {
    scoresWritten: {
      type: 'long',
      _meta: {
        description: 'Number of risk scores written during this scoring task execution',
      },
    },
    taskDurationInSeconds: {
      type: 'long',
      _meta: {
        description: 'Duration (in seconds) of the current risk scoring task execution',
      },
    },
    interval: {
      type: 'keyword',
      _meta: {
        description: `Configured interval for the current risk scoring task`,
      },
    },
    alertSampleSizePerShard: {
      type: 'long',
      _meta: {
        description: `Number of alerts to sample per shard for the current risk scoring task`,
      },
    },
  },
};

export const RISK_SCORE_EXECUTION_ERROR_EVENT: EventTypeOpts<{}> = {
  eventType: 'risk_score_execution_error',
  schema: {},
};

export const RISK_SCORE_EXECUTION_CANCELLATION_EVENT: EventTypeOpts<{
  scoresWritten: number;
  taskDurationInSeconds: number;
  interval: string;
  alertSampleSizePerShard: number;
}> = {
  eventType: 'risk_score_execution_cancellation',
  schema: {
    scoresWritten: {
      type: 'long',
      _meta: {
        description: 'Number of risk scores written during this scoring task execution',
      },
    },
    taskDurationInSeconds: {
      type: 'long',
      _meta: {
        description: 'Duration (in seconds) of the current risk scoring task execution',
      },
    },
    interval: {
      type: 'keyword',
      _meta: {
        description: `Configured interval for the current risk scoring task`,
      },
    },
    alertSampleSizePerShard: {
      type: 'long',
      _meta: {
        description: `Number of alerts to sample per shard for the current risk scoring task`,
      },
    },
  },
};

interface AssetCriticalitySystemProcessedAssignmentFileEvent {
  processing: {
    startTime: string;
    endTime: string;
    tookMs: number;
  };
  result?: BulkUpsertAssetCriticalityRecordsResponse['stats'];
  status: 'success' | 'partial_success' | 'fail';
}

export const ASSET_CRITICALITY_SYSTEM_PROCESSED_ASSIGNMENT_FILE_EVENT: EventTypeOpts<AssetCriticalitySystemProcessedAssignmentFileEvent> =
  {
    eventType: 'Asset Criticality Csv Upload Processed',
    schema: {
      processing: {
        properties: {
          startTime: { type: 'date', _meta: { description: 'Processing start time' } },
          endTime: { type: 'date', _meta: { description: 'Processing end time' } },
          tookMs: { type: 'long', _meta: { description: 'How long processing took ms' } },
        },
      },
      result: {
        properties: {
          successful: {
            type: 'long',
            _meta: { description: 'Number of criticality records successfully created or updated' },
          },
          failed: {
            type: 'long',
            _meta: { description: 'Number of criticality records which had errors' },
          },
          total: { type: 'long', _meta: { description: 'Total number of lines in the file' } },
        },
      },
      status: {
        type: 'keyword',
        _meta: { description: 'Status of the processing either success, partial_success or fail' },
      },
    },
  };

export const ALERT_SUPPRESSION_EVENT: EventTypeOpts<{
  suppressionAlertsCreated: number;
  suppressionAlertsSuppressed: number;
  suppressionRuleName: string;
  suppressionDuration: number;
  suppressionGroupByFieldsNumber: number;
  suppressionGroupByFields: string[];
  suppressionRuleType: string;
  suppressionMissingFields: boolean;
  suppressionRuleId: string;
}> = {
  eventType: 'alert_suppression_on_rule_execution',
  schema: {
    suppressionAlertsCreated: {
      type: 'long',
      _meta: {
        description:
          'Number of alerts created during rule execution with configured alert suppression',
      },
    },
    suppressionAlertsSuppressed: {
      type: 'long',
      _meta: {
        description:
          'Number of alerts suppressed during rule execution with configured alert suppression',
      },
    },
    suppressionRuleName: {
      type: 'keyword',
      _meta: {
        description: 'Name of rule',
      },
    },
    suppressionDuration: {
      type: 'long',
      _meta: {
        description: 'Duration in seconds of suppression period. -1 for per rule execution config',
      },
    },
    suppressionGroupByFieldsNumber: {
      type: 'long',
      _meta: {
        description: 'Number of Suppress by fields',
      },
    },
    suppressionGroupByFields: {
      type: 'array',
      items: {
        type: 'keyword',
        _meta: {
          description: 'Tag attached to the element...',
          optional: false,
        },
      },
      _meta: {
        description: 'List of tags attached to the element...',
        optional: false,
      },
    },
    suppressionRuleType: {
      type: 'keyword',
      _meta: {
        description: 'Rule type',
      },
    },
    suppressionMissingFields: {
      type: 'boolean',
      _meta: {
        description: 'Suppression of missing fields enabled',
      },
    },
    suppressionRuleId: {
      type: 'keyword',
      _meta: {
        description: 'ruleId',
      },
    },
  },
};

export const TELEMETRY_DATA_STREAM_EVENT: EventTypeOpts<DataStream> = {
  eventType: 'telemetry_data_stream_event',
  schema: {
    datastream_name: {
      type: 'keyword',
      _meta: { description: 'Name of the data stream' },
    },
    indices: {
      type: 'array',
      items: {
        properties: {
          index_name: { type: 'date', _meta: { description: 'Index name' } },
          ilm_policy: { type: 'date', _meta: { optional: true, description: 'ILM policy' } },
        },
      },
      _meta: { optional: true, description: 'Indices associated with the data stream' },
    },
  },
};

export const TELEMETRY_INDEX_STATS_EVENT: EventTypeOpts<IndexStats> = {
  eventType: 'telemetry_index_stats_event',
  schema: {
    index_name: {
      type: 'keyword',
      _meta: { description: 'The name of the index being monitored.' },
    },
    query_total: {
      type: 'long',
      _meta: {
        optional: true,
        description: 'The total number of search queries executed on the index.',
      },
    },
    query_time_in_millis: {
      type: 'long',
      _meta: {
        optional: true,
        description:
          'The total time spent on query execution across all search requests, measured in milliseconds.',
      },
    },
    docs_count: {
      type: 'long',
      _meta: {
        optional: true,
        description: 'The total number of documents currently stored in the index.',
      },
    },
    docs_deleted: {
      type: 'long',
      _meta: {
        optional: true,
        description: 'The total number of documents that have been marked as deleted in the index.',
      },
    },
    docs_total_size_in_bytes: {
      type: 'long',
      _meta: {
        optional: true,
        description:
          'The total size, in bytes, of all documents stored in the index, including storage overhead.',
      },
    },
  },
};

export const TELEMETRY_ILM_POLICY_EVENT: EventTypeOpts<IlmPolicy> = {
  eventType: 'telemetry_ilm_policy_event',
  schema: {
    policy_name: {
      type: 'keyword',
      _meta: { description: 'The name of the ILM policy.' },
    },
    modified_date: {
      type: 'date',
      _meta: { description: 'The date when the ILM policy was last modified.' },
    },
    phases: {
      properties: {
        cold: {
          properties: {
            min_age: {
              type: 'text',
              _meta: {
                description: 'The minimum age before the index transitions to the "cold" phase.',
              },
            },
          },
          _meta: {
            optional: true,
            description:
              'Configuration settings for the "cold" phase of the ILM policy, applied when data is infrequently accessed.',
          },
        },
        delete: {
          properties: {
            min_age: {
              type: 'text',
              _meta: {
                description: 'The minimum age before the index transitions to the "delete" phase.',
              },
            },
          },
          _meta: {
            optional: true,
            description:
              'Configuration settings for the "delete" phase of the ILM policy, specifying when the index should be removed.',
          },
        },
        frozen: {
          properties: {
            min_age: {
              type: 'text',
              _meta: {
                description: 'The minimum age before the index transitions to the "frozen" phase.',
              },
            },
          },
          _meta: {
            optional: true,
            description:
              'Configuration settings for the "frozen" phase of the ILM policy, where data is fully searchable but stored with a reduced resource footprint.',
          },
        },
        hot: {
          properties: {
            min_age: {
              type: 'text',
              _meta: {
                description: 'The minimum age before the index transitions to the "hot" phase.',
              },
            },
          },
          _meta: {
            optional: true,
            description:
              'Configuration settings for the "hot" phase of the ILM policy, applied to actively written and queried data.',
          },
        },
        warm: {
          properties: {
            min_age: {
              type: 'text',
              _meta: {
                description: 'The minimum age before the index transitions to the "warm" phase.',
              },
            },
          },
          _meta: {
            optional: true,
            description:
              'Configuration settings for the "warm" phase of the ILM policy, used for read-only data that is less frequently accessed.',
          },
        },
      },
      _meta: {
        description:
          'The different phases of the ILM policy that define how the index is managed over time.',
      },
    },
  },
};

export const TELEMETRY_ILM_STATS_EVENT: EventTypeOpts<IlmStats> = {
  eventType: 'telemetry_ilm_stats_event',
  schema: {
    index_name: {
      type: 'keyword',
      _meta: { description: 'The name of the index currently managed by the ILM  policy.' },
    },
    phase: {
      type: 'keyword',
      _meta: {
        optional: true,
        description:
          'The current phase of the ILM policy that the index is in (e.g., hot, warm, cold, frozen, or delete).',
      },
    },
    age: {
      type: 'text',
      _meta: {
        optional: true,
        description: 'The age of the index since its creation, indicating how long it has existed.',
      },
    },
    policy_name: {
      type: 'keyword',
      _meta: { optional: true, description: 'The name of the ILM policy applied to this index.' },
    },
  },
};

interface CreateAssetCriticalityProcessedFileEvent {
  result?: BulkUpsertAssetCriticalityRecordsResponse['stats'];
  startTime: Date;
  endTime: Date;
}
export const createAssetCriticalityProcessedFileEvent = ({
  result,
  startTime,
  endTime,
}: CreateAssetCriticalityProcessedFileEvent): [
  string,
  AssetCriticalitySystemProcessedAssignmentFileEvent
] => {
  const status = getUploadStatus(result);

  const processing = {
    startTime: startTime.toISOString(),
    endTime: endTime.toISOString(),
    tookMs: endTime.getTime() - startTime.getTime(),
  };

  return [
    ASSET_CRITICALITY_SYSTEM_PROCESSED_ASSIGNMENT_FILE_EVENT.eventType,
    {
      processing,
      result,
      status,
    },
  ];
};

const getUploadStatus = (stats?: BulkUpsertAssetCriticalityRecordsResponse['stats']) => {
  if (!stats) {
    return 'fail';
  }

  if (stats.failed === 0) {
    return 'success';
  }

  if (stats.successful > 0) {
    return 'partial_success';
  }

  return 'fail';
};

export const events = [
  RISK_SCORE_EXECUTION_SUCCESS_EVENT,
  RISK_SCORE_EXECUTION_ERROR_EVENT,
  RISK_SCORE_EXECUTION_CANCELLATION_EVENT,
  ASSET_CRITICALITY_SYSTEM_PROCESSED_ASSIGNMENT_FILE_EVENT,
  ALERT_SUPPRESSION_EVENT,
  TELEMETRY_DATA_STREAM_EVENT,
  TELEMETRY_ILM_POLICY_EVENT,
  TELEMETRY_ILM_STATS_EVENT,
  TELEMETRY_INDEX_STATS_EVENT,
];
