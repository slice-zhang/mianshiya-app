import { forwardRef, memo, useImperativeHandle, useState } from "react";
import { Drawer, Empty, Flex, Spin } from "antd";
import { getQuestionBankAdultLogsAPI } from "@/api/questionBank";
import "./index.scss";
import { QuestionBankAdultLog } from "@/api/questionBank/type";
interface AdultLogsModalProps {}

export interface AdultLogsModalRef {
  open: (id: number) => void;
}

const App = memo(
  forwardRef<AdultLogsModalRef, AdultLogsModalProps>((props, ref) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [adultLogList, setAdultLogList] = useState<QuestionBankAdultLog[]>(
      []
    );
    const [spinning, setSpinning] = useState(false);

    useImperativeHandle(ref, () => ({
      open: async (id: number) => {
        setIsModalOpen(true);
        try {
          setSpinning(true);
          const { data } = await getQuestionBankAdultLogsAPI({
            question_bank_id: id,
          });
          setAdultLogList(data);
        } finally {
          setSpinning(false);
        }
      },
    }));

    return (
      <Drawer
        title="审批日志"
        open={isModalOpen}
        footer={null}
        onClose={() => setIsModalOpen(false)}
      >
        <Spin spinning={spinning}>
          <div id="adult-logs-modal">
            {!!adultLogList.length ? (
              adultLogList.map((i) => (
                <div key={i.id} className="remark-wrap">
                  <Flex justify="space-between" align="center">
                    <div>操作人：{i.user?.username || "-"}</div>
                    <div>{i.created_at}</div>
                  </Flex>
                  <div>备注：{i.remark}</div>
                </div>
              ))
            ) : (
              <Empty />
            )}
          </div>
        </Spin>
      </Drawer>
    );
  })
);

export default App;
