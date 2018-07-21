package com.lr.business.service;

import com.lr.business.entity.PayResult;
import com.lr.business.entity.VipPayResultNotifyRecord;
import com.lr.web.result.ServiceResult;

public interface PayResultNotifyBusinessService {
    ServiceResult<VipPayResultNotifyRecord> queryByOrderNo(String orderNo);

    int insertPayResult(PayResult record);
}
