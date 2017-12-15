
package module.map.action;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;

import com.fasterxml.jackson.databind.ObjectMapper;

import module.map.entity.RenderDTO;
import module.map.form.FyxxbForm;
import module.map.service.FyxxbService;
import module.map.service.RenderService;

/**
 * @author User
 */
public class MapsAction extends DispatchAction{

    @Override
	public ActionForward execute(ActionMapping mapping, ActionForm form, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
        String param = request.getParameter("function");
        RenderService rs = new RenderService();
        FyxxbForm ff = (FyxxbForm)form;
        List<RenderDTO> dtos = null;
        
        if ("draw/district".equals(param)) {
             dtos = rs.listByCity(ff);
        }else if ("draw/street".equals(param)) {
            dtos = rs.listByDistrict(ff);
            
        }else if ("draw/community".equals(param)) {
            dtos = rs.listByStreet(ff);
            
        }else if ("search/houses".equals(param)) {
            Map<String,Object> m = new HashMap<>(0);
            m.put("info", new FyxxbService().list(ff));
            m.put("totalPage", ff.getSp().getIntPageCount());
            m.put("curPage", ff.getSp().getIntPage());
            m.put("intPageSize", ff.getSp().getIntPageSize());
            
            response.setContentType("text/html;charset=utf-8");
            response.getWriter().write(new ObjectMapper().writeValueAsString(m)); 
            return null;   
        
        }else {
            System.err.println("function没有数据啊！");
            return mapping.findForward("mapIndex");
        }
        
        response.setContentType("text/html;charset=utf-8");
        response.getWriter().write(new ObjectMapper().writeValueAsString(dtos)); 
        return null;  
	}
}