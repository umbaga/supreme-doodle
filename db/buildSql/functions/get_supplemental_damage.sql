-- FUNCTION: public.get_supplemental_damage(bigint)

-- DROP FUNCTION public.get_supplemental_damage(bigint);

CREATE OR REPLACE FUNCTION public.get_supplemental_damage(
	"itemId" bigint)
    RETURNS json
    LANGUAGE 'sql'

    COST 100
    VOLATILE 
AS $BODY$

SELECT json_agg(json_build_object(
	'dice', get_dice(supp."diceId"),
	'type', get_item(supp."typeId")
)) FROM adm_def_spell_damage_supplemental supp
WHERE supp."spellId" = $1

$BODY$;

ALTER FUNCTION public.get_supplemental_damage(bigint)
    OWNER TO postgres;
