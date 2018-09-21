-- FUNCTION: public.get_array_of_items_with_number(bigint, bigint)

-- DROP FUNCTION public.get_array_of_items_with_number(bigint, bigint);

CREATE OR REPLACE FUNCTION public.get_array_of_items_with_number(
	"itemId" bigint,
	"linkTypeId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(
	json_build_object(
		'id', i.id,
		'name', i."itemName",
		'value', valnum."numberValue"
	)
) 
FROM adm_link lnk
LEFT OUTER JOIN adm_core_item i ON i.id = lnk."targetId"
LEFT OUTER JOIN adm_link_value_number valnum ON valnum."linkId" = lnk.id
WHERE lnk."typeId" = $2
AND lnk."referenceId" = $1

$BODY$;

ALTER FUNCTION public.get_array_of_items_with_number(bigint, bigint)
    OWNER TO postgres;
