package com.lr.web.service;

import com.lr.business.entity.VipOrder;
import com.lr.business.service.VipOrderBusinessService;

public interface VipOrderService extends VipOrderBusinessService{
    int updateItemIdbyId(Long id, String orderNo);
    int insert(VipOrder vipOrder);
}