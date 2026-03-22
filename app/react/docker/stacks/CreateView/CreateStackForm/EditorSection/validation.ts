import { object, SchemaOf, string } from 'yup';

import { validateYAML } from '@/react/docker/stacks/common/stackYamlValidation';

import { EditorFormValues } from './types';

export function getEditorValidationSchema({
  containerNames = [],
}: {
  containerNames: Array<string> | undefined;
}): SchemaOf<EditorFormValues> {
  return object({
    fileContent: string()
      .required('堆栈文件内容为必填项')
      .min(1, '堆栈文件内容不能为空')
      .test('valid-yaml', '无效的 YAML', function validateYamlTest(value) {
        if (!value) {
          return true;
        }

        const yamlError = validateYAML(value, containerNames, []);

        if (yamlError) {
          return this.createError({ message: yamlError });
        }

        return true;
      }),
  });
}
